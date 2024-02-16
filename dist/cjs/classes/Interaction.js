"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const enums_js_1 = require("../typings/enums.js");
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
    #replied = false;
    constructor(data, client) {
        this.appPermissions = data.app_permissions;
        this.applicationId = BigInt(data.application_id);
        this.channel = data.channel
            ? new index_js_1.Channel(data.channel, client)
            : undefined;
        this.channelId = data.channel_id ? BigInt(data.channel_id) : undefined;
        this.data = (0, index_js_1.convertToCamelCase)(data.data);
        this.guildId = data.guild_id ? BigInt(data.guild_id) : undefined;
        this.guildLocale = data.guild_locale;
        this.id = BigInt(data.id);
        this.locale = data.locale;
        this.member = data.member
            ? new index_js_1.Member(data.member, client, this.guildId)
            : undefined;
        this.message = data.message
            ? new index_js_1.Message(data.message, client)
            : undefined;
        this.token = data.token;
        this.type = data.type;
        this.user = data.user ? new index_js_1.User(data.user, client) : undefined;
        this.version = data.version;
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
        this.#client.createInteractionResponse(this.id, this.token, type, data).then(e => {
            this.#replied = true;
        });
    }
    get customId() {
        return this.data.customId;
    }
    get values() {
        return this.data.values;
    }
    get command() {
        const obj = {
            subCommandGroup: undefined,
            subCommand: undefined,
            name: this.data.name,
        };
        if (this.data.options) {
            for (const option of this.data.options) {
                if (option.type === enums_js_1.ApplicationCommandOptionTypes.SubCommandGroup) {
                    obj.subCommandGroup = option.name;
                    obj.subCommand = option.options?.[0].name;
                }
                else if (option.type === enums_js_1.ApplicationCommandOptionTypes.SubCommand) {
                    obj.subCommand = option.name;
                }
            }
        }
        return obj;
    }
    get options() {
        const options = {};
        if (this.data.options) {
            for (const option of this.data.options) {
                if (option.type === enums_js_1.ApplicationCommandOptionTypes.SubCommand) {
                    for (const subOption of option.options ?? []) {
                        options[subOption.name] = subOption.value;
                    }
                }
                else if (option.type === enums_js_1.ApplicationCommandOptionTypes.SubCommandGroup) {
                    for (const subOption of option.options ?? []) {
                        if (subOption.type === enums_js_1.ApplicationCommandOptionTypes.SubCommand)
                            options[subOption.name] = subOption.value;
                    }
                }
                else {
                    options[option.name] = option.value;
                }
            }
        }
        return options;
    }
    get replied() {
        return this.#replied;
    }
}
exports.default = Interaction;
//# sourceMappingURL=Interaction.js.map