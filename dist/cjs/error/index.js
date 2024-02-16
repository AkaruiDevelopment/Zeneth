"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZenethError = void 0;
class ZenethError {
    static apiError(msg, url, route, status, method) {
        const error = new Error(msg);
        error.name = 'ZenethError -> [DAPIError]';
        error.url = url;
        error.route = route;
        error.code = status;
        error.method = method;
        throw error;
    }
    static WebSocketError(msg, code) {
        const error = new Error(msg);
        error.name = 'ZenethError -> [WebSocketError]';
        error.code = code;
        throw error;
    }
}
exports.ZenethError = ZenethError;
//# sourceMappingURL=index.js.map