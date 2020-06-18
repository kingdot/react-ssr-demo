import { AppRunner } from '@tencent/ngw-serverless-runtime';
const app = require('../../../server/index-ngw');

export const main_handler = async (e, c) => {
    return AppRunner(() => app.callback(), e, c);
};
