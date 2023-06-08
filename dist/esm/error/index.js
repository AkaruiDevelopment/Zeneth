export class AoiLunaError {
    static apiError(msg, url, route, status, method) {
        const error = new Error(msg);
        error.name = 'AoiLunaError -> [DAPIError]';
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
//# sourceMappingURL=index.js.map