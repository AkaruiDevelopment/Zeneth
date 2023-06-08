import {
    Camelize,
    Channel,
    Member,
    Message,
    User,
    convertToCamelCase,
} from "..";
import {
    InteractionResponsePayload,
    RawInteractionData,
    RawInteractionDataData,
    RawMessageComponentData,
    SelectOption,
} from "../typings/interface.js";
import Client from "../client/index.js";
import { ComponentTypes, InteractionTypes, Locales } from "../typings/enums.js";
export default class Interaction {
    appPermissions: string | undefined;
    applicationId: bigint;
    channel: Channel | undefined;
    channelId: bigint | undefined;
    data: Camelize<RawInteractionDataData>;
    guildId: bigint | undefined;
    guildLocale?: Locales;
    id: bigint;
    locale?: Locales;
    member: Member | undefined;
    message: Message | undefined;
    token: string;
    type: InteractionTypes;
    user: User | undefined;
    version: number;
    #client: Client;
    components?: Camelize<RawMessageComponentData>[];
    componentType?: ComponentTypes; 
    customId: string | undefined;
    values?: SelectOption[];

    constructor(data: RawInteractionData, client: Client) {
        this.appPermissions = data.app_permissions;
        this.applicationId = BigInt(data.application_id);
        this.channel = data.channel
            ? new Channel(data.channel, client)
            : undefined;
        this.channelId = data.channel_id ? BigInt(data.channel_id) : undefined;
        this.data = convertToCamelCase(
            data.data,
        ) as Camelize<RawInteractionDataData>;
        this.guildId = data.guild_id ? BigInt(data.guild_id) : undefined;
        this.guildLocale = data.guild_locale;
        this.id = BigInt(data.id);
        this.locale = data.locale;
        this.member = data.member
            ? new Member(data.member, client, this.guildId)
            : undefined;
        this.message = data.message
            ? new Message(data.message, client)
            : undefined;
        this.token = data.token;
        this.type = data.type;
        this.user = data.user ? new User(data.user, client) : undefined;
        this.version = data.version;
        this.components = convertToCamelCase(data.components) as Camelize<RawMessageComponentData>[];
        this.componentType = data.component_type;
        this.customId = data.custom_id;
        this.values = data.values;
        this.#client = client;

        this.#clean();
    }
    #clean() {
        for (const key in this) if (this[key] === undefined) delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }
    createResponse(type:InteractionTypes,data:InteractionResponsePayload) {
        this.#client.createInteractionResponse(this.id, this.token, type, data);
    }
}
