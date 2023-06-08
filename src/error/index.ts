export class AoiLunaError {
  static apiError(
    msg: string,
    url: string,
    route: string,
    status: number,
    method: string,
  ) {
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
