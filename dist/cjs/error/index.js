"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZenethError = void 0;
class ZenethError {
    static apiError(msg, url, route, status, method) {
        const error = new Error(msg);
        error.name = 'ZenethError -> [DAPIError]';
        //@ts-ignore
        error.url = url;
        //@ts-ignore
        error.route = route;
        //@ts-ignore
        error.code = status;
        //@ts-ignore
        error.method = method;
        throw error;
    }
}
exports.ZenethError = ZenethError;
//# sourceMappingURL=index.js.map