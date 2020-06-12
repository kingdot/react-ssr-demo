const Koa = require('koa');
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const serve = require('koa-static');
const fs = require("fs");
const path = require("path");
const ServerRenderer = require("./renderer");

const app = new Koa();

const isProd = process.env.NODE_ENV === "production";

let renderer;
let readyPromise;
let template = fs.readFileSync("./index.html", "utf-8");

if (isProd) {
    // 静态资源映射到dist路径下
    app.use(serve(path.join(__dirname, "../dist")));

    let bundle = require("../dist/server-bundle.json");
    let stats = require("../dist/loadable-stats.json");
    renderer = new ServerRenderer(bundle, template, stats);
} else { // 等待打包完成
    readyPromise = require("./dev-server")(app, ( // 每次代码变更都生成新的 rendered 对象，读取最新的bundle
        bundle,
        stats) => {
        renderer = new ServerRenderer(bundle, template, stats);
    });
}

app.use(serve(path.join(__dirname, "../public")))

const render = async (ctx, next) => {
    const {request, response} = ctx;
    console.log("======enter server======");
    console.log("visit url: " + request.url);

    // 此对象会合并然后传给服务端路由，不需要可不传
    const context = {};

    let renderRes;
    try {
        renderRes = await renderer.renderToString(request, context);
    } catch (e) {
        console.log(e);
        response.status = 500;
        response.body = "Internal server error";
    }
    let {error, html} = renderRes;

    if (error) {
        if (error.url) {
            response.redirect(error.url);
        } else if (error.code) {
            response.status = error.code;
            response.body = "error code：" + error.code;
        }
    }
    response.body = html;
}


router.get("(.*)", async (ctx, next) => {
    if (!isProd) {
        // 等待客户端和服务端打包完成后进行render
        await readyPromise;
    }
    await next();
}, render);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log("Your app is running");
});

module.exports = app;