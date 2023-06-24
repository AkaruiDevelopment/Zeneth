"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__request__ = void 0;
const index_js_1 = require("../error/index.js");
//@ts-ignore
const libconstants_js_1 = require("../utils/libconstants.js");
const helpers_js_1 = require("../utils/helpers.js");
async function __request__(route, data, client) {
    const res = await fetch(data.url, data);
    if (res.headers.get('x-ratelimit-bucket')) {
        const routeData = (0, helpers_js_1.createNullObject)();
        routeData.route = route.route;
        routeData.bucket = res.headers.get('x-ratelimit-bucket');
        routeData.limit = Number(res.headers.get('x-ratelimit-limit'));
        routeData.remaining = Number(res.headers.get('x-ratelimit-remaining'));
        routeData.resetAfter = Number(res.headers.get('x-ratelimit-reset-after')) * 1000;
        routeData.reset = Number(res.headers.get('x-ratelimit-reset'));
        routeData.global = res.headers.get('x-ratelimit-global') === 'true';
        client.queue.add(routeData);
    }
    const oldGlobal = client.queue.get('global');
    const routeData = (0, helpers_js_1.createNullObject)();
    routeData.route = 'global';
    routeData.bucket = 'global';
    routeData.limit = oldGlobal?.limit ?? 50;
    routeData.remaining = (oldGlobal?.remaining ?? 50) - 1;
    routeData.resetAfter = oldGlobal?.resetAfter ?? -1;
    routeData.reset = oldGlobal?.reset ?? Date.now() + 1000;
    routeData.resetAfter = routeData.reset - Date.now();
    routeData.global = true;
    client.queue.add(routeData);
    return res;
}
exports.__request__ = __request__;
async function request(data, client, headers) {
    const requestData = {
        url: data.url,
        method: data.method,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': libconstants_js_1.userAgent,
            Authorization: `Bot ${client.token}`,
        },
        body: data.params
            ? data.params instanceof FormData
                ? data.params
                : (0, helpers_js_1.Stringify)((0, helpers_js_1.convertToSnakeCase)(data.params))
            : null,
    };
    if (headers) {
        for (const key of Object.keys(headers)) {
            // @ts-ignore
            if (headers[key] === undefined)
                delete requestData.headers[key];
            //@ts-ignore
            else
                requestData.headers[key] = headers[key];
        }
    }
    if (data.auditLogReason)
        // @ts-ignore
        requestData.headers['X-Audit-Log-Reason'] = data.auditLogReason;
    const queueData = client.queue.get(data.route);
    const globalQueueData = client.queue.get('global');
    if (globalQueueData && !globalQueueData.remaining) {
        return await new Promise((resolve) => {
            setTimeout(async () => {
                const res = await __request__(data, requestData, client);
                if (res.ok)
                    resolve(res.json());
                else {
                    throw index_js_1.ZenethError.apiError((await res.json()).message, data.url, data.route, res.status, data.method);
                }
            }, globalQueueData.resetAfter);
        });
    }
    else {
        if (queueData && !queueData.remaining) {
            return await new Promise((resolve) => {
                setTimeout(async () => {
                    const res = await __request__(data, requestData, client);
                    if (res.ok)
                        resolve(res.json());
                    else {
                        throw index_js_1.ZenethError.apiError((await res.json()).message, data.url, data.route, res.status, data.method);
                    }
                }, queueData.resetAfter);
            });
        }
        else {
            const res = await __request__(data, requestData, client);
            if (res.ok)
                return res.json();
            else {
                throw index_js_1.ZenethError.apiError((await res.json()).message, data.url, data.route, res.status, data.method);
            }
        }
    }
}
exports.default = request;
//# sourceMappingURL=index.js.map