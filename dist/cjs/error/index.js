"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiLunaError = void 0;
class AoiLunaError {
    static apiError(msg, url, route, status, method) {
        const error = new Error(msg);
        error.name = 'UzumiError -> [DAPIError]';
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
exports.AoiLunaError = AoiLunaError;
//# sourceMappingURL=index.js.map