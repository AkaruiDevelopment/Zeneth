import Websocket from "../websocket/index.js";
import Api from "../utils/api.js";
import QueueManager from "../request/queue.js";
import request from "../request/index.js";
import { convertToCamelCase, convertUrlOrFileToBase64, createNullObject, parseDataToAoiLunaStandards, returnMessagePayload, } from "../utils/helpers.js";
import { Channel, Emoji, Guild, Invite, Member, Message, Role, User, } from "../classes/index.js";
export default class Client {
    #options;
    ws;
    #on = {};
    api = Api;
    readyData;
    queue;
    constructor(options) {
        this.#options = options;
        this.ws = new Websocket(this);
        this.queue = new QueueManager(this);
    }
    get token() {
        return this.#options.token;
    }
    get intents() {
        return this.#options.intents;
    }
    get options() {
        return this.#options;
    }
    get user() {
        return this.readyData.user;
    }
    on(event, callback) {
        if (!this.#on[event]) {
            this.#on[event] = [];
        }
        this.#on[event]?.push(callback);
    }
    get __on__() {
        return this.#on;
    }
    emit(event, ...args) {
        for (const f of this.#on[event] ?? []) {
            f(...args);
        }
    }
    // ApplicationRoleConnectionMetadata
    async getApplicationRoleConnectionMetadataRecords(appId) {
        const builtApi = this.api()
            .applications(appId ?? this.readyData.user.id, `role-connections`)
            .metadata()
            .get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    async updateApplicationRoleConnectionMetadataRecords(data, appId) {
        const builtApi = this.api()
            .applications(appId ?? this.readyData.user.id, `role-connections`)
            .metadata()
            .patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    // AuditLogs
    async getGuildAuditLogs(guildId) {
        const builtApi = this.api().guilds(guildId)["audit-logs"]().get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    // AutoModeration
    async listAutoModerationRules(guildId) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules()
            .get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    async getAutoModerationRule(guildId, ruleId) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules(ruleId)
            .get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    async createAutoModerationRule(guildId, data, reason) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules()
            .post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async updateAutoModerationRule(guildId, ruleId, data, reason) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules(ruleId)
            .patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteAutoModerationRule(guildId, ruleId, reason) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules(ruleId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    //Channel
    async getChannel(channelId) {
        const builtApi = this.api().channels(channelId).get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return new Channel(res, this);
    }
    async updateChannel(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteChannel(channelId, reason) {
        const builtApi = this.api().channels(channelId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async getChannelMessages(channelId, options) {
        const builtApi = this.api().channels(channelId).messages().get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        data.params = options;
        const res = await request(data, this);
        return res.map((message) => new Message(message, this));
    }
    async getChannelMessage(channelId, messageId) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .get();
        const data = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return new Message(res, this);
    }
    async createMessage(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).messages().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const payload = await returnMessagePayload(data);
        req.params = payload;
        let res;
        if (payload instanceof FormData)
            res = await request(req, this, {
                "Content-Type": undefined,
            });
        else
            res = await request(req, this);
        return new Message(res, this);
    }
    async crosspostMessage(channelId, messageId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .crosspost()
            .post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Message(res, this);
    }
    async deleteMessage(channelId, messageId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async createReaction(channelId, messageId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))["@me"]()
            .put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteOwnReaction(channelId, messageId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .me()
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteReaction(channelId, messageId, userId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .users(userId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async getReactions(channelId, messageId, emoji, options) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = options;
        const res = await request(req, this);
        return res.map((x) => new User(x, this));
    }
    async deleteAllReactions(channelId, messageId) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions()
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteAllReactionsForEmoji(channelId, messageId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async editMessage(channelId, messageId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const payload = await returnMessagePayload(data);
        req.params = payload;
        let res;
        if (payload instanceof FormData)
            res = await request(req, this, {
                "Content-Type": undefined,
            });
        else
            res = await request(req, this);
        return new Message(res, this);
    }
    async deleteBulkMessages(channelId, messageIds, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages()
            .bulkDelete()
            .post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { messages: messageIds };
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async editChannelPermissions(channelId, overwriteId, data, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .permissions(overwriteId)
            .put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async getChannelInvites(channelId) {
        const builtApi = this.api().channels(channelId).invites().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((x) => new Invite(x, this));
    }
    async createChannelInvite(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).invites().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data ?? {};
        const res = await request(req, this);
        return new Invite(res, this);
    }
    async deleteChannelPermission(channelId, overwriteId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .permissions(overwriteId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async followAnnouncementChannel(channelId, webhookChannelId) {
        const builtApi = this.api().channels(channelId).followers().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { webhookChannelId };
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async triggerTypingIndicator(channelId) {
        const builtApi = this.api().channels(channelId).typing().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async getPinnedMessages(channelId) {
        const builtApi = this.api().channels(channelId).pins().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((x) => new Message(x, this));
    }
    async pinMessage(channelId, messageId, reason) {
        const builtApi = this.api().channels(channelId).pins(messageId).put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async unpinMessage(channelId, messageId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .pins(messageId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async groupDMAddRecipient(channelId, userId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .recipients(userId)
            .put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async groupDMRemoveRecipient(channelId, userId) {
        const builtApi = this.api()
            .channels(channelId)
            .recipients(userId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async startThreadFromMessage(channelId, messageId, data, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .threads()
            .post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Channel(res, this);
    }
    async startThreadWithoutMessage(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).threads().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Channel(res, this);
    }
    async startThreadInForum(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).threads().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Channel(res, this);
    }
    async joinThread(channelId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"]("@me")
            .put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async addThreadMember(channelId, userId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"](userId)
            .put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async leaveThread(channelId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"]("@me")
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async removeThreadMember(channelId, userId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"](userId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async getThreadMember(channelId, userId, withMember = true) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"](userId)
            .get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { withMember };
        const res = await request(req, this);
        return {
            id: BigInt(res.id),
            userId: BigInt(res.user_id),
            joinTimestamp: new Date(res.join_timestamp),
            flags: res.flags,
            member: res.member ? new Member(res.member, this) : null,
        };
    }
    async listThreadMembers(channelId, includeGuildMember) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"]()
            .get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (includeGuildMember !== undefined)
            req.params = { with_member: includeGuildMember };
        const res = await request(req, this);
        return res.map((member) => ({
            id: BigInt(member.id),
            userId: BigInt(member.user_id),
            joinTimestamp: new Date(member.join_timestamp),
            flags: member.flags,
            member: member.member ? new Member(member.member, this) : null,
        }));
    }
    async listPublicArchivedThreads(channelId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .threads()
            .archived("public")
            .get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return {
            threads: res.threads.map((thread) => new Channel(thread, this)),
            members: res.members.map((member) => {
                return {
                    id: member.id ? BigInt(member.id) : undefined,
                    userId: member.user_id ? BigInt(member.user_id) : undefined,
                    joinTimestamp: member.join_timestamp
                        ? new Date(member.join_timestamp)
                        : undefined,
                    flags: member.flags,
                    member: member.member
                        ? new Member(member.member, this)
                        : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    async listPrivateArchivedThreads(channelId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .threads()
            .archived("private")
            .get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return {
            threads: res.threads.map((thread) => new Channel(thread, this)),
            members: res.members.map((member) => {
                return {
                    id: member.id ? BigInt(member.id) : undefined,
                    userId: member.user_id ? BigInt(member.user_id) : undefined,
                    joinTimestamp: member.join_timestamp
                        ? new Date(member.join_timestamp)
                        : undefined,
                    flags: member.flags,
                    member: member.member
                        ? new Member(member.member, this)
                        : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    async listJoinedPrivateArchivedThreads(channelId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .users("@me")
            .threads()
            .archived("private")
            .get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return {
            threads: res.threads.map((thread) => new Channel(thread, this)),
            members: res.members.map((member) => {
                return {
                    id: member.id ? BigInt(member.id) : undefined,
                    userId: member.user_id ? BigInt(member.user_id) : undefined,
                    joinTimestamp: member.join_timestamp
                        ? new Date(member.join_timestamp)
                        : undefined,
                    flags: member.flags,
                    member: member.member
                        ? new Member(member.member, this)
                        : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    // Emoji
    async listGuildEmojis(guildId) {
        const builtApi = this.api().guilds(guildId).emojis().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((emoji) => new Emoji(emoji, this));
    }
    async getGuildEmoji(guildId, emojiId) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return new Emoji(res, this);
    }
    async createGuildEmoji(guildId, data) {
        const builtApi = this.api().guilds(guildId).emojis().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = {
            name: data.name,
            image: convertUrlOrFileToBase64(data.image),
            roles: data.roles,
        };
        const res = await request(req, this);
        return new Emoji(res, this);
    }
    async modifyGuildEmoji(guildId, emojiId, data) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return new Emoji(res, this);
    }
    async deleteGuildEmoji(guildId, emojiId) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    // Guild
    async createGuild(data) {
        const builtApi = this.api().guilds().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return new Guild(res, this);
    }
    async getGuildPreview(guildId) {
        const builtApi = this.api().guilds(guildId).preview().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return parseDataToAoiLunaStandards(convertToCamelCase(res));
    }
    async modifyGuild(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId).patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Guild(res, this);
    }
    async deleteGuild(guildId) {
        const builtApi = this.api().guilds(guildId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuild(guildId) {
        const builtApi = this.api().guilds(guildId).get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return new Guild(res, this);
    }
    async getGuildChannels(guildId) {
        const builtApi = this.api().guilds(guildId).channels().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((channel) => new Channel(channel, this));
    }
    async createGuildChannel(guildId, data) {
        const builtApi = this.api().guilds(guildId).channels().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return new Channel(res, this);
    }
    async modifyGuildChannelPositions(guildId, data) {
        const builtApi = this.api().guilds(guildId).channels().patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
    }
    async listActiveGuildThreads(guildId) {
        const builtApi = this.api().guilds(guildId).threads().active().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        res.threads = res.threads.map((thread) => new Channel(thread, this));
        res.members = res.members.map((threadMember) => {
            return {
                id: threadMember.id ? BigInt(threadMember.id) : undefined,
                userId: threadMember.user_id
                    ? BigInt(threadMember.user_id)
                    : undefined,
                joinTimestamp: threadMember.join_timestamp
                    ? new Date(threadMember.join_timestamp)
                    : undefined,
                flags: threadMember.flags,
                member: threadMember.member
                    ? new Member(threadMember.member, this)
                    : undefined,
            };
        });
        return res;
    }
    async getGuildMember(guildId, userId) {
        const builtApi = this.api().guilds(guildId).members(userId).get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return new Member(res, this);
    }
    async listGuildMembers(guildId, data) {
        const builtApi = this.api().guilds(guildId).members().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return res.map((member) => new Member(member, this));
    }
    async searchGuildMembers(guildId, data) {
        const builtApi = this.api().guilds(guildId).members().search().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return res.map((member) => new Member(member, this));
    }
    async addGuildMember(guildId, userId, data) {
        const builtApi = this.api().guilds(guildId).members(userId).put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }
    async modifyGuildMember(guildId, userId, data) {
        const builtApi = this.api().guilds(guildId).members(userId).patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }
    async modifyCurrentUserNick(guildId, nick, reason) {
        const builtApi = this.api().guilds(guildId).members("@me").patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { nick };
        req.auditLogReason = reason;
        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }
    async addGuildMemberRole(guildId, userId, roleId, reason) {
        const builtApi = this.api()
            .guilds(guildId)
            .members(userId)
            .roles(roleId)
            .put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }
    async removeGuildMemberRole(guildId, userId, roleId, reason) {
        const builtApi = this.api()
            .guilds(guildId)
            .members(userId)
            .roles(roleId)
            .delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }
    async removeGuildMember(guildId, userId, reason) {
        const builtApi = this.api().guilds(guildId).members(userId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuildBans(guildId) {
        const builtApi = this.api().guilds(guildId).bans().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((ban) => {
            return {
                reason: ban.reason,
                user: new User(ban.user, this),
            };
        });
    }
    async getGuildBan(guildId, userId) {
        const builtApi = this.api().guilds(guildId).bans(userId).get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this)
            .then((e) => {
            return {
                reason: e.reason,
                user: new User(e.user, this),
            };
        })
            .catch((e) => null);
        return res;
    }
    async createGuildBan(guildId, userId, data, reason) {
        const builtApi = this.api().guilds(guildId).bans(userId).put();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        req.params = data;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async removeGuildBan(guildId, userId, reason) {
        const builtApi = this.api().guilds(guildId).bans(userId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuildRoles(guildId) {
        const builtApi = this.api().guilds(guildId).roles().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((role) => new Role(role, this));
    }
    async createGuildRole(guildId, data) {
        const builtApi = this.api().guilds(guildId).roles().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        const res = await request(req, this);
        return new Role(res, this);
    }
    async modifyGuildRolePositions(guildId, roleId, position, reason) {
        const builtApi = this.api().guilds(guildId).roles().patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { id: roleId, position };
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Role(res, this);
    }
    async modifyGuildRole(guildId, roleId, data, reason) {
        const builtApi = this.api().guilds(guildId).roles(roleId).patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return new Role(res, this);
    }
    async deleteGuildRole(guildId, roleId, reason) {
        const builtApi = this.api().guilds(guildId).roles(roleId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async modifyGuildMFALevel(guildId, level, reason) {
        const builtApi = this.api().guilds(guildId).mfa().patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = { level };
        const res = await request(req, this);
        return new Guild(res, this);
    }
    async getGuildPruneCount(guildId, data) {
        const builtApi = this.api().guilds(guildId).prune().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        const res = await request(req, this);
        return res.pruned;
    }
    async beginGuildPrune(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId).prune().post();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        const res = await request(req, this);
        return res.pruned;
    }
    async getGuildVoiceRegions(guildId) {
        const builtApi = this.api().guilds(guildId).regions().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await request(req, this);
    }
    async getGuildInvites(guildId) {
        const builtApi = this.api().guilds(guildId).invites().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return res.map((invite) => new Invite(invite, this));
    }
    async getGuildIntegrations(guildId) {
        const builtApi = this.api().guilds(guildId).integrations().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return convertToCamelCase(await request(req, this));
    }
    async deleteGuildIntegration(guildId, integrationId, reason) {
        const builtApi = this.api().guilds(guildId).integrations(integrationId).delete();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuildWidgetSettings(guildId) {
        const builtApi = this.api().guilds(guildId).widget().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return convertToCamelCase(await request(req, this));
    }
    async modifyGuildWidget(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId).widget().patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = data;
        return convertToCamelCase(await request(req, this));
    }
    async getGuildWidget(guildId) {
        const builtApi = this.api().guilds(guildId)["widget.json"]().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await request(req, this);
    }
    async getGuildVanityUrl(guildId) {
        const builtApi = this.api().guilds(guildId)["vanity-url"]().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await request(req, this);
    }
    async getGuildWidgetImage(guildId, style) {
        const builtApi = this.api().guilds(guildId)["widget.png"]().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.params = { style };
        req.method = builtApi.method;
        return await request(req, this);
    }
    async getGuildWelcomeScreen(guildId) {
        const builtApi = this.api().guilds(guildId)["welcome-screen"]().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }
    async modifyGuildWelcomeScreen(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId)["welcome-screen"]().patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = data;
        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }
    async getGuildOnBoarding(guildId) {
        const builtApi = this.api().guilds(guildId)["onboarding-application"]().get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }
    async modifyCurrentUserVoiceState(guildId, data) {
        const builtApi = this.api().guilds(guildId)["voice-states"]("@me").patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }
    async modifyUserVoiceState(guildId, userId, data) {
        const builtApi = this.api().guilds(guildId)["voice-states"](userId).patch();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }
    // User
    async getUser(userId) {
        const builtApi = this.api().users(userId).get();
        const req = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await request(req, this);
        return new User(res, this);
    }
    getUrlFromHash(hash, type, size = 1024, format = "webp", dynamic = true) {
        const url = `https://cdn.discordapp.com/${type}/${hash}.${dynamic ? "gif" : format}?size=${size}`;
        return url;
    }
}
//# sourceMappingURL=index.js.map