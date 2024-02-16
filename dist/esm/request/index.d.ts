import Client from "../client/index.js";
import { requestOptions } from "../typings/interface.js";
export declare function __request__(route: requestOptions, data: {
    url: string;
} & RequestInit, client: Client): Promise<Response>;
export default function request(data: requestOptions, client: Client, headers?: Record<string, unknown>): Promise<any>;
//# sourceMappingURL=index.d.ts.map