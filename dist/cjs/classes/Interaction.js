"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class Interaction {
    appPermissions;
    applicationId;
    channel;
    channelId;
    data;
    guildId;
    guildLocale;
    id;
    locale;
    member;
    message;
    token;
    type;
    user;
    version;
    #client;
    components;
    componentType;
    customId;
    values;
    constructor(data, client) {
        this.appPermissions = data.app_permissions;
        this.applicationId = BigInt(data.application_id);
        this.channel = data.channel
            ? new __1.Channel(data.channel, client)
            : undefined;
        this.channelId = data.channel_id ? BigInt(data.channel_id) : undefined;
        this.data = (0, __1.convertToCamelCase)(data.data);
        this.guildId = data.guild_id ? BigInt(data.guild_id) : undefined;
        this.guildLocale = data.guild_locale;
        this.id = BigInt(data.id);
        this.locale = data.locale;
        this.member = data.member
            ? new __1.Member(data.member, client, this.guildId)
            : undefined;
        this.message = data.message
            ? new __1.Message(data.message, client)
            : undefined;
        this.token = data.token;
        this.type = data.type;
        this.user = data.user ? new __1.User(data.user, client) : undefined;
        this.version = data.version;
        this.components = (0, __1.convertToCamelCase)(data.components);
        this.componentType = data.component_type;
        this.customId = data.custom_id;
        this.values = data.values;
        this.#client = client;
        this.#clean();
    }
    #clean() {
        for (const key in this)
            if (this[key] === undefined)
                delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }
    createResponse(type, data) {
        this.#client.createInteractionResponse(this.id, this.token, type, data);
    }
}
exports.default = Interaction;
//# sourceMappingURL=Interaction.js.map