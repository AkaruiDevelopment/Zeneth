import { Channel, Member, Message, User, convertToCamelCase, } from "../index.js";
import { ApplicationCommandOptionTypes } from "../typings/enums.js";
export default class Interaction {
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
            ? new Channel(data.channel, client)
            : undefined;
        this.channelId = data.channel_id ? BigInt(data.channel_id) : undefined;
        this.data = convertToCamelCase(data.data);
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
                if (option.type === ApplicationCommandOptionTypes.SubCommandGroup) {
                    obj.subCommandGroup = option.name;
                    obj.subCommand = option.options?.[0].name;
                }
                else if (option.type === ApplicationCommandOptionTypes.SubCommand) {
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
                if (option.type === ApplicationCommandOptionTypes.SubCommand) {
                    for (const subOption of option.options ?? []) {
                        options[subOption.name] = subOption.value;
                    }
                }
                else if (option.type === ApplicationCommandOptionTypes.SubCommandGroup) {
                    for (const subOption of option.options ?? []) {
                        if (subOption.type === ApplicationCommandOptionTypes.SubCommand)
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
//# sourceMappingURL=Interaction.js.map