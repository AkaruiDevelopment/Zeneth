"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFilePath = exports.parseSnowflake = exports.convertFileToBase64 = exports.convertUrlOrFileToBase64 = exports.convertUrlToBase64 = exports.createDebug = exports.returnMessagePayload = exports.getFileData = exports.isUrl = exports.Stringify = exports.createNullObject = exports.convertToSnakeCase = exports.convertToCamelCase = exports.parseDataToAoiLunaStandards = exports.ConvertBigIntToHex = exports.ConvertHexToBigInt = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const debugManager_js_1 = __importDefault(require("../events/manager/debugManager.js"));
const enums_js_1 = require("../typings/enums.js");
function ConvertHexToBigInt(hash) {
    if (hash.startsWith("a_")) {
        return -BigInt("0x" + hash.slice(2));
    }
    return BigInt("0x" + hash);
}
exports.ConvertHexToBigInt = ConvertHexToBigInt;
function ConvertBigIntToHex(hash) {
    if (hash < 0n) {
        return "a_" + (-hash).toString(16);
    }
    return hash.toString(16);
}
exports.ConvertBigIntToHex = ConvertBigIntToHex;
function parseDataToAoiLunaStandards(data) {
    if (data === null)
        return null;
    if (data === undefined)
        return undefined;
    if (!isNaN(Number(data)) && typeof data === "string" && Number(data) > Number.MAX_SAFE_INTEGER)
        return BigInt(data);
    if (typeof data === "string") {
        try {
            return new Date(data);
        }
        catch {
            return data;
        }
    }
    if (typeof data === "object" && data) {
        if (data instanceof Array) {
            return data.map((item) => parseDataToAoiLunaStandards(item));
        }
        for (const key in data) {
            data[key] = parseDataToAoiLunaStandards(data[key]);
        }
        return data;
    }
    return data;
}
exports.parseDataToAoiLunaStandards = parseDataToAoiLunaStandards;
function convertToCamelCase(obj) {
    if (typeof obj !== "object")
        return parseDataToAoiLunaStandards(obj);
    if (!obj)
        return obj;
    else if (obj instanceof Array) {
        return obj.map((item) => {
            return convertToCamelCase(item);
        });
    }
    else {
        const newObj = {};
        for (const key in obj) {
            const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            newObj[newKey] = convertToCamelCase(obj[key]);
        }
        // @ts-ignore
        return newObj;
    }
}
exports.convertToCamelCase = convertToCamelCase;
function convertToSnakeCase(obj) {
    if (typeof obj !== "object")
        return obj;
    if (!obj)
        return obj;
    else if (obj instanceof Array) {
        return obj.map((item) => {
            return convertToSnakeCase(item);
        });
    }
    else {
        const newObj = {};
        for (const key in obj) {
            const newKey = key.replace(/[A-Z]/g, (g) => `_${g[0].toLowerCase()}`);
            newObj[newKey] = convertToSnakeCase(obj[key]);
        }
        // @ts-ignore
        return newObj;
    }
}
exports.convertToSnakeCase = convertToSnakeCase;
function createNullObject() {
    return Object.create(null);
}
exports.createNullObject = createNullObject;
function Stringify(obj) {
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
exports.Stringify = Stringify;
function isUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isUrl = isUrl;
//@ts-ignore
const fileType = async (file) => 
// @ts-ignore
await import("file-type").then((x) => x.fileTypeFromBuffer(file));
async function getFileData(file) {
    if (typeof file === "string") {
        if (isUrl(file)) {
            const res = await fetch(file);
            return new Blob([await res.arrayBuffer()], {
                type: res.headers.get("content-type"),
            });
        }
        else if (isFilePath(file)) {
            const res = await (0, promises_1.readFile)(file);
            return new Blob([res], {
                type: (await fileType(res))?.mime ?? "application/octet-stream",
            });
        }
        else {
            return new Blob([file], { type: "text/plain" });
        }
    }
    return new Blob([file], {
        type: (await fileType(file))?.mime ?? "application/octet-stream",
    });
}
exports.getFileData = getFileData;
async function returnMessagePayload(payload) {
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
                formData.append(attachment.file.key, attachment.file.blob, attachment.file.filename);
            else
                formData.append(`files[${index}]`, await getFileData(attachment.data), attachment.name);
        }
        return formData;
    }
    return object;
}
exports.returnMessagePayload = returnMessagePayload;
function createDebug(data, client) {
    const d = {
        d: data,
        t: enums_js_1.GatewayEventNames.Debug,
        op: enums_js_1.GatewayOpCodes.Dispatch,
        s: -1,
    };
    (0, debugManager_js_1.default)(d, client);
}
exports.createDebug = createDebug;
async function convertUrlToBase64(url) {
    const resData = await fetch(url);
    const imageType = resData.headers.get("content-type");
    const buffer = await resData.arrayBuffer();
    const base64Flag = `data:${imageType};base64,`;
    const imageStr = Buffer.from(buffer).toString("base64");
    return base64Flag + imageStr;
}
exports.convertUrlToBase64 = convertUrlToBase64;
async function convertUrlOrFileToBase64(urlOrFile) {
    if (isUrl(urlOrFile))
        return await convertUrlToBase64(urlOrFile);
    else
        return await convertFileToBase64(urlOrFile);
}
exports.convertUrlOrFileToBase64 = convertUrlOrFileToBase64;
async function convertFileToBase64(file) {
    const bitmap = await (0, promises_1.readFile)(file);
    const fileImageType = await fileType(bitmap);
    const base64Flag = `data:${fileImageType?.mime};base64,`;
    const imageStr = Buffer.from(bitmap).toString("base64");
    return base64Flag + imageStr;
}
exports.convertFileToBase64 = convertFileToBase64;
function parseSnowflake(snowflake) {
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
exports.parseSnowflake = parseSnowflake;
function isFilePath(path) {
    try {
        return (0, fs_1.statSync)(path).isFile();
    }
    catch {
        return false;
    }
}
exports.isFilePath = isFilePath;
//# sourceMappingURL=helpers.js.map