"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_js_1 = require("../utils/helpers.js");
const User_js_1 = __importDefault(require("./User.js"));
const Member_js_1 = __importDefault(require("./Member.js"));
class Message {
    #client;
    activity;
    application;
    application_id;
    attachments;
    guildId;
    member;
    author;
    channelId;
    components;
    content;
    editedTimestamp;
    embeds;
    flags;
    id;
    interaction;
    messageReference;
    nonce;
    pinned;
    reactions;
    referencedMessage;
    stickers;
    stickerItems;
    timestamp;
    tts;
    type;
    roleSubscriptionData;
    webhookId;
    thread;
    mentions;
    __priority;
    constructor(data, client) {
        this.#client = client;
        this.activity = (0, helpers_js_1.convertToCamelCase)(data.activity);
        this.application = ((0, helpers_js_1.convertToCamelCase)(data.application));
        this.application_id = data.application_id
            ? BigInt(data.application_id)
            : undefined;
        this.attachments = (0, helpers_js_1.convertToCamelCase)(data.attachments);
        this.author = new User_js_1.default(data.author, client);
        this.channelId = BigInt(data.channel_id);
        this.components = (0, helpers_js_1.convertToCamelCase)(data.components);
        this.content = data.content;
        this.editedTimestamp = data.edited_timestamp;
        this.embeds = (0, helpers_js_1.convertToCamelCase)(data.embeds);
        this.flags = data.flags;
        this.id = BigInt(data.id);
        this.interaction = (0, helpers_js_1.convertToCamelCase)(data.interaction);
        this.mentions = {
            everyone: data.mention_everyone ?? false,
            roles: data.mention_roles.map((x) => BigInt(x)) ?? [],
            users: data.mentions.map(x => new User_js_1.default(x, this.#client)) ?? [],
            channels: ((0, helpers_js_1.convertToCamelCase)(data.mention_channels)) ?? [],
        };
        this.messageReference = ((0, helpers_js_1.convertToCamelCase)(data.message_reference));
        this.nonce = data.nonce
            ? !isNaN(Number(data.nonce))
                ? BigInt(data.nonce)
                : data.nonce
            : undefined;
        this.pinned = data.pinned;
        this.reactions = (0, helpers_js_1.convertToCamelCase)(data.reactions);
        this.referencedMessage = data.referenced_message
            ? new Message(data.referenced_message, client)
            : undefined;
        this.stickers = (0, helpers_js_1.convertToCamelCase)(data.stickers);
        this.stickerItems = (0, helpers_js_1.convertToCamelCase)(data.sticker_items);
        this.timestamp = new Date(data.timestamp);
        this.tts = data.tts;
        this.type = data.type;
        this.roleSubscriptionData = ((0, helpers_js_1.convertToCamelCase)(data.role_subscription_data));
        this.guildId = data.guild_id ? BigInt(data.guild_id) : undefined;
        this.member = data.member ? new Member_js_1.default(data.member, client) : undefined;
        this.webhookId = data.webhook_id ? BigInt(data.webhook_id) : undefined;
        this.thread = (0, helpers_js_1.convertToCamelCase)(data.thread);
        this.#clean();
        this.__priority = 0;
    }
    #clean() {
        for (const key in this)
            if (this[key] === undefined)
                delete this[key];
    }
    delete() {
        return this.#client.deleteMessage(this.channelId, this.id);
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map