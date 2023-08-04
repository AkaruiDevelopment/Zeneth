import { statSync } from "fs";
import { GatewayDebugData, MessagePayload } from "../typings/interface.js";
import { Camelize, Snakify, Snowflake } from "../typings/types.js";
import { readFile } from "fs/promises";
import DebugManager from "../events/manager/debugManager.js";
import Client from "../client/index.js";
import { GatewayEventNames, GatewayOpCodes } from "../typings/enums.js";
import { ColorResolve } from "../plugins/builders/type.js";
import { Colors } from "../plugins/builders/enum.js";

export function ConvertHexToBigInt(hash: string) {
    if (hash.startsWith("a_")) {
        return -BigInt("0x" + hash.slice(2));
    }
    return BigInt("0x" + hash);
}

export function ConvertBigIntToHex(hash: bigint) {
    if (hash < 0n) {
        return "a_" + (-hash).toString(16);
    }
    return hash.toString(16);
}

export function parseDataToZenethStandards(data: any): any {
    if (data === null) return null;
    if (data === undefined) return undefined;
    if (
        !isNaN(Number(data)) &&
        typeof data === "string" &&
        Number(data) > Number.MAX_SAFE_INTEGER
    )
        return BigInt(data);
    if (typeof data === "string") {
        try {
            const d = new Date(data);
            if (d.toString() !== "Invalid Date") return d;
            else return data;
        } catch {
            return data;
        }
    }
    if (typeof data === "object" && data) {
        if (data instanceof Array) {
            return data.map((item) => parseDataToZenethStandards(item));
        }
        for (const key in data) {
            data[key] = parseDataToZenethStandards(data[key]);
        }
        return data;
    }
    return data;
}

export function convertToCamelCase<T extends any>(
    obj: T,
): Camelize<T> | Camelize<T>[] | T {
    if (typeof obj !== "object")
        return parseDataToZenethStandards(obj) as Camelize<T>;
    if (!obj) return obj as Camelize<T>;
    else if (obj instanceof Array) {
        return obj.map((item) => {
            return convertToCamelCase(item) as Camelize<T>;
        });
    } else {
        const newObj: Record<string, any> = {};
        for (const key in obj) {
            const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            newObj[newKey] = convertToCamelCase(obj[key]);
        }
        // @ts-ignore
        return newObj;
    }
}

export function convertToSnakeCase<T extends any>(
    obj: T,
): Snakify<T> | Snakify<T>[] | T {
    if (typeof obj !== "object") return obj as Snakify<T>;
    if (!obj) return obj as Snakify<T>;
    else if (obj instanceof Array) {
        return obj.map((item) => {
            return convertToSnakeCase(item) as Snakify<T>;
        });
    } else {
        const newObj: Record<string, any> = {};
        for (const key in obj) {
            const newKey = key.replace(
                /[A-Z]/g,
                (g) => `_${g[0].toLowerCase()}`,
            );
            newObj[newKey] = convertToSnakeCase(obj[key]);
        }
        // @ts-ignore
        return newObj;
    }
}

export function createNullObject() {
    return Object.create(null);
}

export function Stringify(obj: any) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    });
}

export function isUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
//@ts-ignore
const fileType = async (file: Buffer) =>
    // @ts-ignore
    await import("file-type").then((x) => x.fileTypeFromBuffer(file));

export async function getFileData(file: string | Buffer) {
    if (typeof file === "string") {
        if (isUrl(file)) {
            const res = await fetch(file);
            return new Blob([await res.arrayBuffer()], {
                type: <string>res.headers.get("content-type"),
            });
        } else if (isFilePath(file)) {
            const res = await readFile(file);
            return new Blob([res], {
                type: (await fileType(res))?.mime ?? "application/octet-stream",
            });
        } else {
            return new Blob([file], { type: "text/plain" });
        }
    }
    return new Blob([file], {
        type: (await fileType(file))?.mime ?? "application/octet-stream",
    });
}

export async function returnMessagePayload(payload: MessagePayload) {
    const object = createNullObject();
    object.content = payload.content ?? " ";
    object.embeds = payload.embeds;
    object.allowedMentions = payload.allowedMentions;
    object.components = payload.components;
    object.flags = payload.flags;
    object.messageReference = payload.messageReference;
    object.stickerIds = payload.stickerIds;
    object.nounce = payload.nounce;
    object.tts = payload.tts;
    object.attachments = payload.attachments?.map((a, i) => {
        return {
            id: i.toString(),
            filename: a.spoiler ? "SPOILER_" + a.name : a.name,
            description: a.description,
        };
    });
    if (object.attachments && object.attachments.length === 0)
        delete object.attachments;
    if (payload.attachments && payload.attachments.length > 0) {
        const formData = new FormData();
        formData.append("payload_json", Stringify(convertToSnakeCase(object)));
        let index = 0;
        for (const attachment of payload.attachments) {
            if (attachment.file)
                formData.append(
                    attachment.file.key,
                    attachment.file.blob,
                    attachment.file.filename,
                );
            else
                formData.append(
                    `files[${index}]`,
                    await getFileData(attachment.data),
                    attachment.name,
                );
        }
        return formData;
    }
    return object;
}

export function createDebug(data: GatewayDebugData["d"], client: Client) {
    const d = {
        d: data,
        t: GatewayEventNames.Debug as GatewayEventNames.Debug,
        op: GatewayOpCodes.Dispatch as GatewayOpCodes.Dispatch,
        s: -1,
    };
    DebugManager(d, client);
}

export async function convertUrlToBase64(url: string) {
    const resData = await fetch(url);
    const imageType = resData.headers.get("content-type");
    const buffer = await resData.arrayBuffer();
    const base64Flag = `data:${imageType};base64,`;
    const imageStr = Buffer.from(buffer).toString("base64");
    return base64Flag + imageStr;
}

export async function convertUrlOrFileToBase64(urlOrFile: string) {
    if (isUrl(urlOrFile)) return await convertUrlToBase64(urlOrFile);
    else return await convertFileToBase64(urlOrFile);
}

export async function convertFileToBase64(file: string) {
    const bitmap = await readFile(file);
    const fileImageType = await fileType(bitmap);
    const base64Flag = `data:${fileImageType?.mime};base64,`;
    const imageStr = Buffer.from(bitmap).toString("base64");
    return base64Flag + imageStr;
}

export function parseSnowflake(snowflake: Snowflake) {
    const binary = snowflake.toString(2).padStart(64, "0");
    const timestamp = Number((snowflake >> 22n) + 1420070400000n);
    const workerId = (snowflake & 0x3e0000n) >> 17n;
    const processId = (snowflake & 0x1f000n) >> 12n;
    const increment = snowflake & 0xfffn;
    const date = new Date(timestamp);

    return {
        timestamp,
        date,
        workerId,
        processId,
        increment,
        binary,
    };
}

export function isFilePath(path: string) {
    try {
        return statSync(path).isFile();
    } catch {
        return false;
    }
}

export function parseColor(color: ColorResolve) {
    if (typeof color === "number") return color;
    if (typeof color === "string") {
        if (color.startsWith("#")) {
            return parseInt(color.slice(1), 16);
        } else if (color.startsWith("rgb")) {
            const [r, g, b] = color
                .slice(4, -1)
                .split(",")
                .map((x) => parseInt(x.trim()));
            return (r << 16) + (g << 8) + b;
        } else if (color.startsWith("hsl")) {
            const [h, s, l] = color
                .slice(4, -1)
                .split(",")
                .map((x) => parseInt(x.trim()));
            return parseInt(hslToHex(h, s, l).slice(1), 16);
        } else if (Colors[color as keyof typeof Colors] !== undefined)
            return Colors[color as keyof typeof Colors];
    }
    return 0;
}

export function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;

    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}
