import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {fetchTopDetail, setClientLoad} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";

function TopDetail({match}) {
    const {clientShouldLoad, topDetail} = useSelector((state) => ({
        clientShouldLoad: state.clientShouldLoad,
        topDetail: state.topDetail
    }));
    const dispatch = useDispatch();
    const {id} = match.params;

    useEffect(() => {
        // 判断是否需要加载数据
        if (clientShouldLoad === true) {
            dispatch(fetchTopDetail(id));
        } else {
            // 客户端执行后，将客户端是否加载数据设置为true
            dispatch(setClientLoad(true));
        }
    }, [])

    return (
        <div>
            <Helmet>
                <title>{topDetail.name}</title>
            </Helmet>
            <div>
                <img src={topDetail.pic} width="120" height="120" style={{float: "left", "marginRight": "20px"}}/>
                <span dangerouslySetInnerHTML={{__html: topDetail.info}}></span>
            </div>
        </div>
    );
}

export default TopDetail;
