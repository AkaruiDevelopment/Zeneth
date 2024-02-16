import { ZenethError } from "../error/index.js";
import { userAgent } from "../utils/libconstants.js";
import { Stringify, convertToSnakeCase, createNullObject, } from "../utils/helpers.js";
export async function __request__(route, data, client) {
    const res = await fetch(data.url, data);
    if (res.headers.get("x-ratelimit-bucket")) {
        const routeData = createNullObject();
        routeData.route = route.route;
        routeData.bucket = res.headers.get("x-ratelimit-bucket");
        routeData.limit = Number(res.headers.get("x-ratelimit-limit"));
        routeData.remaining = Number(res.headers.get("x-ratelimit-remaining"));
        routeData.resetAfter =
            Number(res.headers.get("x-ratelimit-reset-after")) * 1000;
        routeData.reset = Number(res.headers.get("x-ratelimit-reset"));
        routeData.global = res.headers.get("x-ratelimit-global") === "true";
        client.queue.add(routeData);
    }
    const oldGlobal = client.queue.get("global");
    const routeData = createNullObject();
    routeData.route = "global";
    routeData.bucket = "global";
    routeData.limit = oldGlobal?.limit ?? 50;
    routeData.remaining = (oldGlobal?.remaining ?? 50) - 1;
    routeData.resetAfter = oldGlobal?.resetAfter ?? -1;
    routeData.reset = oldGlobal?.reset ?? Date.now() + 1000;
    routeData.resetAfter = routeData.reset - Date.now();
    routeData.global = true;
    client.queue.add(routeData);
    return res;
}
export default async function request(data, client, headers) {
    const requestData = {
        url: data.url,
        method: data.method,
        headers: {
            "Content-Type": "application/json",
            "User-Agent": userAgent,
            Authorization: `Bot ${client.token}`,
        },
        body: data.params
            ? data.params instanceof FormData
                ? data.params
                : Stringify(convertToSnakeCase(data.params))
            : null,
    };
    if (headers) {
        for (const key of Object.keys(headers)) {
            if (headers[key] === undefined)
                delete requestData.headers[key];
            else
                requestData.headers[key] = headers[key];
        }
    }
    if (data.auditLogReason)
        requestData.headers["X-Audit-Log-Reason"] = data.auditLogReason;
    const queueData = client.queue.get(data.route);
    const globalQueueData = client.queue.get("global");
    if (globalQueueData && !globalQueueData.remaining) {
        return await new Promise((resolve) => {
            setTimeout(async () => {
                const res = await __request__(data, requestData, client);
                if (res.ok && res.status !== 204)
                    resolve(res.json());
                else {
                    throw ZenethError.apiError((res.status !== 204
                        ? await res.json()
                        : { message: "No content" }).message, data.url, data.route, res.status, data.method);
                }
            }, globalQueueData.resetAfter);
        });
    }
    else {
        if (queueData && !queueData.remaining) {
            return await new Promise((resolve) => {
                setTimeout(async () => {
                    const res = await __request__(data, requestData, client);
                    if (res.ok && res.status !== 204)
                        resolve(res.json());
                    else {
                        throw ZenethError.apiError((res.status !== 204
                            ? await res.json()
                            : { message: "No content" }).message, data.url, data.route, res.status, data.method);
                    }
                }, queueData.resetAfter);
            });
        }
        else {
            const res = await __request__(data, requestData, client);
            if (res.ok && res.status !== 204)
                return (res.json());
            else {
                throw ZenethError.apiError((res.status !== 204
                    ? await res.json()
                    : { message: "No content" }).message, data.url, data.route, res.status, data.method);
            }
        }
    }
}
//# sourceMappingURL=index.js.map