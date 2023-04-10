import { convertToCamelCase } from '../utils/helpers.js';
import User from './User.js';
import Member from './Member.js';
export default class Message {
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
        this.activity = convertToCamelCase(data.activity);
        this.application = (convertToCamelCase(data.application));
        this.application_id = data.application_id
            ? BigInt(data.application_id)
            : undefined;
        this.attachments = convertToCamelCase(data.attachments);
        this.author = new User(data.author, client);
        this.channelId = BigInt(data.channel_id);
        this.components = convertToCamelCase(data.components);
        this.content = data.content;
        this.editedTimestamp = data.edited_timestamp;
        this.embeds = convertToCamelCase(data.embeds);
        this.flags = data.flags;
        this.id = BigInt(data.id);
        this.interaction = convertToCamelCase(data.interaction);
        this.mentions = {
            everyone: data.mention_everyone ?? false,
            roles: data.mention_roles.map((x) => BigInt(x)) ?? [],
            users: data.mentions.map(x => new User(x, this.#client)) ?? [],
            channels: (convertToCamelCase(data.mention_channels)) ?? [],
        };
        this.messageReference = (convertToCamelCase(data.message_reference));
        this.nonce = data.nonce
            ? !isNaN(Number(data.nonce))
                ? BigInt(data.nonce)
                : data.nonce
            : undefined;
        this.pinned = data.pinned;
        this.reactions = convertToCamelCase(data.reactions);
        this.referencedMessage = data.referenced_message
            ? new Message(data.referenced_message, client)
            : undefined;
        this.stickers = convertToCamelCase(data.stickers);
        this.stickerItems = convertToCamelCase(data.sticker_items);
        this.timestamp = new Date(data.timestamp);
        this.tts = data.tts;
        this.type = data.type;
        this.roleSubscriptionData = (convertToCamelCase(data.role_subscription_data));
        this.guildId = data.guild_id ? BigInt(data.guild_id) : undefined;
        this.member = data.member ? new Member(data.member, client) : undefined;
        this.webhookId = data.webhook_id ? BigInt(data.webhook_id) : undefined;
        this.thread = convertToCamelCase(data.thread);
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
//# sourceMappingURL=Message.js.map