/// <reference types="node" />
import { GatewayDebugData, MessagePayload } from '../typings/interface.js';
import { Camelize, Snakify, Snowflake } from '../typings/types.js';
import Client from '../client/index.js';
export declare function ConvertHexToBigInt(hash: string): bigint;
export declare function ConvertBigIntToHex(hash: bigint): string;
export declare function parseDataToAoiLunaStandards(data: any): any;
export declare function convertToCamelCase<T extends any>(obj: T): Camelize<T> | Camelize<T>[] | T;
export declare function convertToSnakeCase<T extends any>(obj: T): Snakify<T> | Snakify<T>[] | T;
export declare function createNullObject(): any;
export declare function Stringify(obj: any): string;
export declare function isUrl(url: string): boolean;
export declare function getFileData(file: string | Buffer): Promise<Blob>;
export declare function returnMessagePayload(payload: MessagePayload): Promise<any>;
export declare function createDebug(data: GatewayDebugData['d'], client: Client): void;
export declare function convertUrlToBase64(url: string): Promise<string>;
export declare function convertUrlOrFileToBase64(urlOrFile: string): Promise<string>;
export declare function convertFileToBase64(file: string): Promise<string>;
export declare function parseSnowflake(snowflake: Snowflake): {
    timestamp: number;
    date: Date;
    workerId: bigint;
    processId: bigint;
    increment: bigint;
    binary: string;
};
//# sourceMappingURL=helpers.d.ts.map