import Channel from '../classes/Channel.js';
import Guild from '../classes/Guild.js';
import Message from '../classes/Message.js';
import { Interaction } from '../index.js';
import { GatewayEventNames } from './enums.js';
import { GatewayDebugData, GatewayHelloData, GatewayReadyData, GatewayResumedData } from './interface.js';
export type integer = number;
export type CamelizeString<T extends PropertyKey> = T extends string ? string extends T ? string : T extends `${infer F}_${infer R}` ? `${F}${Capitalize<CamelizeString<R>>}` : T : T;
export type Camelize<T> = {
    [K in keyof T as CamelizeString<K>]: T[K];
};
export type snowflake = string;
export type Snowflake = bigint;
export type EventData<T extends GatewayEventNames> = T extends GatewayEventNames.Hello ? GatewayHelloData : null;
export type ClientEvents<T extends GatewayEventNames> = T extends GatewayEventNames.Hello ? (data: Camelize<GatewayHelloData>) => void : T extends GatewayEventNames.Ready ? (data: Camelize<GatewayReadyData>) => void : T extends GatewayEventNames.Resumed ? (data: Camelize<GatewayResumedData>) => void : T extends GatewayEventNames.Reconnect ? () => void : T extends GatewayEventNames.MessageCreate ? (data: Message) => void : T extends GatewayEventNames.Debug ? (data: Camelize<GatewayDebugData>) => void : T extends GatewayEventNames.ChannelCreate ? (data: Channel) => void : T extends GatewayEventNames.GuildCreate ? (data: Guild) => void : T extends GatewayEventNames.GuildDelete ? (data: Guild) => void : T extends GatewayEventNames.GuildUpdate ? (data: Guild) => void : T extends GatewayEventNames.MessageDelete ? (data: Message) => void : T extends GatewayEventNames.MessageUpdate ? (data: Message) => void : T extends GatewayEventNames.MessageDeleteBulk ? (data: Message[]) => void : T extends GatewayEventNames.InteractionCreate ? (data: Interaction) => void : Function;
export type ApiroxyData = {
    api: string;
    route: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
} & {
    [x: string]: (...value: any[]) => ApiroxyData;
};
export type SnakifyString<T extends PropertyKey> = T extends string ? string extends T ? string : T extends `${infer F}${infer R}` ? `${Uncapitalize<F>}_${Uncapitalize<SnakifyString<R>>}` : T : T;
export type Snakify<T> = {
    [K in keyof T as SnakifyString<K>]: T[K];
};
export type SweeperType = "noSweep" | "timedSweep" | "priority";
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif";
export type WidgetImageStyle = "shield" | "banner1" | "banner2" | "banner3" | "banner4";
//# sourceMappingURL=types.d.ts.map