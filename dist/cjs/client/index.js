"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../websocket/index.js"));
const api_js_1 = __importDefault(require("../utils/api.js"));
const queue_js_1 = __importDefault(require("../request/queue.js"));
const index_js_2 = __importDefault(require("../request/index.js"));
const helpers_js_1 = require("../utils/helpers.js");
const index_js_3 = require("../classes/index.js");
class Client {
    #options;
    ws;
    #on = {};
    api = api_js_1.default;
    readyData;
    queue;
    constructor(options) {
        this.#options = options;
        this.ws = new index_js_1.default(this);
        this.queue = new queue_js_1.default(this);
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
    async getApplicationRoleConnectionMetadataRecords(appId) {
        const builtApi = this.api()
            .applications(appId ?? this.readyData.user.id, `role-connections`)
            .metadata()
            .get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async updateApplicationRoleConnectionMetadataRecords(data, appId) {
        const builtApi = this.api()
            .applications(appId ?? this.readyData.user.id, `role-connections`)
            .metadata()
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getGuildAuditLogs(guildId) {
        const builtApi = this.api().guilds(guildId)["audit-logs"]().get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async listAutoModerationRules(guildId) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules()
            .get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getAutoModerationRule(guildId, ruleId) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules(ruleId)
            .get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async createAutoModerationRule(guildId, data, reason) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules()
            .post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async updateAutoModerationRule(guildId, ruleId, data, reason) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules(ruleId)
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async deleteAutoModerationRule(guildId, ruleId, reason) {
        const builtApi = this.api()
            .guilds(guildId)["auto-moderation"]()
            .rules(ruleId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getChannel(channelId) {
        const builtApi = this.api().channels(channelId).get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return new index_js_3.Channel(res, this);
    }
    async updateChannel(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async deleteChannel(channelId, reason) {
        const builtApi = this.api().channels(channelId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getChannelMessages(channelId, options) {
        const builtApi = this.api().channels(channelId).messages().get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        data.params = options;
        const res = await (0, index_js_2.default)(data, this);
        return res.map((message) => new index_js_3.Message(message, this));
    }
    async getChannelMessage(channelId, messageId) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return new index_js_3.Message(res, this);
    }
    async createMessage(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).messages().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const payload = await (0, helpers_js_1.returnMessagePayload)(data);
        req.params = payload;
        let res;
        if (payload instanceof FormData)
            res = await (0, index_js_2.default)(req, this, {
                "Content-Type": undefined,
            });
        else
            res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Message(res, this);
    }
    async crosspostMessage(channelId, messageId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .crosspost()
            .post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Message(res, this);
    }
    async deleteMessage(channelId, messageId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async createReaction(channelId, messageId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))["@me"]()
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async deleteOwnReaction(channelId, messageId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .me()
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async deleteReaction(channelId, messageId, userId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .users(userId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getReactions(channelId, messageId, emoji, options) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = options;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((x) => new index_js_3.User(x, this));
    }
    async deleteAllReactions(channelId, messageId) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions()
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async deleteAllReactionsForEmoji(channelId, messageId, emoji) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async editMessage(channelId, messageId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const payload = await (0, helpers_js_1.returnMessagePayload)(data);
        req.params = payload;
        let res;
        if (payload instanceof FormData)
            res = await (0, index_js_2.default)(req, this, {
                "Content-Type": undefined,
            });
        else
            res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Message(res, this);
    }
    async deleteBulkMessages(channelId, messageIds, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages()
            .bulkDelete()
            .post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { messages: messageIds };
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async editChannelPermissions(channelId, overwriteId, data, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .permissions(overwriteId)
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getChannelInvites(channelId) {
        const builtApi = this.api().channels(channelId).invites().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((x) => new index_js_3.Invite(x, this));
    }
    async createChannelInvite(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).invites().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data ?? {};
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Invite(res, this);
    }
    async deleteChannelPermission(channelId, overwriteId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .permissions(overwriteId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async followAnnouncementChannel(channelId, webhookChannelId) {
        const builtApi = this.api().channels(channelId).followers().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { webhookChannelId };
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async triggerTypingIndicator(channelId) {
        const builtApi = this.api().channels(channelId).typing().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getPinnedMessages(channelId) {
        const builtApi = this.api().channels(channelId).pins().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((x) => new index_js_3.Message(x, this));
    }
    async pinMessage(channelId, messageId, reason) {
        const builtApi = this.api().channels(channelId).pins(messageId).put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async unpinMessage(channelId, messageId, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .pins(messageId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async groupDMAddRecipient(channelId, userId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .recipients(userId)
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async groupDMRemoveRecipient(channelId, userId) {
        const builtApi = this.api()
            .channels(channelId)
            .recipients(userId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async startThreadFromMessage(channelId, messageId, data, reason) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .threads()
            .post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Channel(res, this);
    }
    async startThreadWithoutMessage(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).threads().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Channel(res, this);
    }
    async startThreadInForum(channelId, data, reason) {
        const builtApi = this.api().channels(channelId).threads().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Channel(res, this);
    }
    async joinThread(channelId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"]("@me")
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async addThreadMember(channelId, userId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"](userId)
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async leaveThread(channelId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"]("@me")
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async removeThreadMember(channelId, userId) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"](userId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async getThreadMember(channelId, userId, withMember = true) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"](userId)
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { withMember };
        const res = await (0, index_js_2.default)(req, this);
        return {
            id: BigInt(res.id),
            userId: BigInt(res.user_id),
            joinTimestamp: new Date(res.join_timestamp),
            flags: res.flags,
            member: res.member ? new index_js_3.Member(res.member, this) : null,
        };
    }
    async listThreadMembers(channelId, includeGuildMember) {
        const builtApi = this.api()
            .channels(channelId)["thread-members"]()
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (includeGuildMember !== undefined)
            req.params = { with_member: includeGuildMember };
        const res = await (0, index_js_2.default)(req, this);
        return res.map((member) => ({
            id: BigInt(member.id),
            userId: BigInt(member.user_id),
            joinTimestamp: new Date(member.join_timestamp),
            flags: member.flags,
            member: member.member ? new index_js_3.Member(member.member, this) : null,
        }));
    }
    async listPublicArchivedThreads(channelId, data) {
        const builtApi = this.api()
            .channels(channelId)
            .threads()
            .archived("public")
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return {
            threads: res.threads.map((thread) => new index_js_3.Channel(thread, this)),
            members: res.members.map((member) => {
                return {
                    id: member.id ? BigInt(member.id) : undefined,
                    userId: member.user_id ? BigInt(member.user_id) : undefined,
                    joinTimestamp: member.join_timestamp
                        ? new Date(member.join_timestamp)
                        : undefined,
                    flags: member.flags,
                    member: member.member
                        ? new index_js_3.Member(member.member, this)
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
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return {
            threads: res.threads.map((thread) => new index_js_3.Channel(thread, this)),
            members: res.members.map((member) => {
                return {
                    id: member.id ? BigInt(member.id) : undefined,
                    userId: member.user_id ? BigInt(member.user_id) : undefined,
                    joinTimestamp: member.join_timestamp
                        ? new Date(member.join_timestamp)
                        : undefined,
                    flags: member.flags,
                    member: member.member
                        ? new index_js_3.Member(member.member, this)
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
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return {
            threads: res.threads.map((thread) => new index_js_3.Channel(thread, this)),
            members: res.members.map((member) => {
                return {
                    id: member.id ? BigInt(member.id) : undefined,
                    userId: member.user_id ? BigInt(member.user_id) : undefined,
                    joinTimestamp: member.join_timestamp
                        ? new Date(member.join_timestamp)
                        : undefined,
                    flags: member.flags,
                    member: member.member
                        ? new index_js_3.Member(member.member, this)
                        : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    async listGuildEmojis(guildId) {
        const builtApi = this.api().guilds(guildId).emojis().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((emoji) => new index_js_3.Emoji(emoji, this));
    }
    async getGuildEmoji(guildId, emojiId) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Emoji(res, this);
    }
    async createGuildEmoji(guildId, data) {
        const builtApi = this.api().guilds(guildId).emojis().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = {
            name: data.name,
            image: (0, helpers_js_1.convertUrlOrFileToBase64)(data.image),
            roles: data.roles,
        };
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Emoji(res, this);
    }
    async modifyGuildEmoji(guildId, emojiId, data) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Emoji(res, this);
    }
    async deleteGuildEmoji(guildId, emojiId) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async createGuild(data) {
        const builtApi = this.api().guilds().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Guild(res, this);
    }
    async getGuildPreview(guildId) {
        const builtApi = this.api().guilds(guildId).preview().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.parseDataToZenethStandards)((0, helpers_js_1.convertToCamelCase)(res));
    }
    async modifyGuild(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId).patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Guild(res, this);
    }
    async deleteGuild(guildId) {
        const builtApi = this.api().guilds(guildId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuild(guildId) {
        const builtApi = this.api().guilds(guildId).get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Guild(res, this);
    }
    async getGuildChannels(guildId) {
        const builtApi = this.api().guilds(guildId).channels().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((channel) => new index_js_3.Channel(channel, this));
    }
    async createGuildChannel(guildId, data) {
        const builtApi = this.api().guilds(guildId).channels().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Channel(res, this);
    }
    async modifyGuildChannelPositions(guildId, data) {
        const builtApi = this.api().guilds(guildId).channels().patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
    }
    async listActiveGuildThreads(guildId) {
        const builtApi = this.api().guilds(guildId).threads().active().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        res.threads = res.threads.map((thread) => new index_js_3.Channel(thread, this));
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
                    ? new index_js_3.Member(threadMember.member, this)
                    : undefined,
            };
        });
        return res;
    }
    async getGuildMember(guildId, userId) {
        const builtApi = this.api().guilds(guildId).members(userId).get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Member(res, this);
    }
    async listGuildMembers(guildId, data) {
        const builtApi = this.api().guilds(guildId).members().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((member) => new index_js_3.Member(member, this));
    }
    async searchGuildMembers(guildId, data) {
        const builtApi = this.api().guilds(guildId).members().search().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((member) => new index_js_3.Member(member, this));
    }
    async addGuildMember(guildId, userId, data) {
        const builtApi = this.api().guilds(guildId).members(userId).put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res ? new index_js_3.Member(res, this) : null;
    }
    async modifyGuildMember(guildId, userId, data) {
        const builtApi = this.api().guilds(guildId).members(userId).patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res ? new index_js_3.Member(res, this) : null;
    }
    async modifyCurrentUserNick(guildId, nick, reason) {
        const builtApi = this.api().guilds(guildId).members("@me").patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { nick };
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return res ? new index_js_3.Member(res, this) : null;
    }
    async addGuildMemberRole(guildId, userId, roleId, reason) {
        const builtApi = this.api()
            .guilds(guildId)
            .members(userId)
            .roles(roleId)
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return res ? new index_js_3.Member(res, this) : null;
    }
    async removeGuildMemberRole(guildId, userId, roleId, reason) {
        const builtApi = this.api()
            .guilds(guildId)
            .members(userId)
            .roles(roleId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return res ? new index_js_3.Member(res, this) : null;
    }
    async removeGuildMember(guildId, userId, reason) {
        const builtApi = this.api().guilds(guildId).members(userId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuildBans(guildId) {
        const builtApi = this.api().guilds(guildId).bans().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((ban) => {
            return {
                reason: ban.reason,
                user: new index_js_3.User(ban.user, this),
            };
        });
    }
    async getGuildBan(guildId, userId) {
        const builtApi = this.api().guilds(guildId).bans(userId).get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this)
            .then((e) => {
            return {
                reason: e.reason,
                user: new index_js_3.User(e.user, this),
            };
        })
            .catch((e) => null);
        return res;
    }
    async createGuildBan(guildId, userId, data, reason) {
        const builtApi = this.api().guilds(guildId).bans(userId).put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        req.params = data;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async removeGuildBan(guildId, userId, reason) {
        const builtApi = this.api().guilds(guildId).bans(userId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuildRoles(guildId) {
        const builtApi = this.api().guilds(guildId).roles().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((role) => new index_js_3.Role(role, this));
    }
    async createGuildRole(guildId, data) {
        const builtApi = this.api().guilds(guildId).roles().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Role(res, this);
    }
    async modifyGuildRolePositions(guildId, roleId, position, reason) {
        const builtApi = this.api().guilds(guildId).roles().patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { id: roleId, position };
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Role(res, this);
    }
    async modifyGuildRole(guildId, roleId, data, reason) {
        const builtApi = this.api().guilds(guildId).roles(roleId).patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Role(res, this);
    }
    async deleteGuildRole(guildId, roleId, reason) {
        const builtApi = this.api().guilds(guildId).roles(roleId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async modifyGuildMFALevel(guildId, level, reason) {
        const builtApi = this.api().guilds(guildId).mfa().patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = { level };
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Guild(res, this);
    }
    async getGuildPruneCount(guildId, data) {
        const builtApi = this.api().guilds(guildId).prune().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res.pruned;
    }
    async beginGuildPrune(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId).prune().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        if (data)
            req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res.pruned;
    }
    async getGuildVoiceRegions(guildId) {
        const builtApi = this.api().guilds(guildId).regions().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this);
    }
    async getGuildInvites(guildId) {
        const builtApi = this.api().guilds(guildId).invites().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res.map((invite) => new index_js_3.Invite(invite, this));
    }
    async getGuildIntegrations(guildId) {
        const builtApi = this.api().guilds(guildId).integrations().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return (0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this));
    }
    async deleteGuildIntegration(guildId, integrationId, reason) {
        const builtApi = this.api()
            .guilds(guildId)
            .integrations(integrationId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this)
            .catch((e) => false)
            .then((e) => true);
    }
    async getGuildWidgetSettings(guildId) {
        const builtApi = this.api().guilds(guildId).widget().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return (0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this));
    }
    async modifyGuildWidget(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId).widget().patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = data;
        return (0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this));
    }
    async getGuildWidget(guildId) {
        const builtApi = this.api().guilds(guildId)["widget.json"]().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this);
    }
    async getGuildVanityUrl(guildId) {
        const builtApi = this.api().guilds(guildId)["vanity-url"]().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this);
    }
    async getGuildWidgetImage(guildId, style) {
        const builtApi = this.api().guilds(guildId)["widget.png"]().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.params = { style };
        req.method = builtApi.method;
        return await (0, index_js_2.default)(req, this);
    }
    async getGuildWelcomeScreen(guildId) {
        const builtApi = this.api().guilds(guildId)["welcome-screen"]().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return (0, helpers_js_1.parseDataToZenethStandards)((0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this)));
    }
    async modifyGuildWelcomeScreen(guildId, data, reason) {
        const builtApi = this.api().guilds(guildId)["welcome-screen"]().patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = data;
        return (0, helpers_js_1.parseDataToZenethStandards)((0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this)));
    }
    async getGuildOnBoarding(guildId) {
        const builtApi = this.api()
            .guilds(guildId)["onboarding-application"]()
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        return (0, helpers_js_1.parseDataToZenethStandards)((0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this)));
    }
    async modifyCurrentUserVoiceState(guildId, data) {
        const builtApi = this.api()
            .guilds(guildId)["voice-states"]("@me")
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        return (0, helpers_js_1.parseDataToZenethStandards)((0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this)));
    }
    async modifyUserVoiceState(guildId, userId, data) {
        const builtApi = this.api()
            .guilds(guildId)["voice-states"](userId)
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        return (0, helpers_js_1.parseDataToZenethStandards)((0, helpers_js_1.convertToCamelCase)(await (0, index_js_2.default)(req, this)));
    }
    async getUser(userId) {
        const builtApi = this.api().users(userId).get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.User(res, this);
    }
    getUrlFromHash(hash, type, size = 1024, format = "webp", dynamic = true) {
        const url = `https://cdn.discordapp.com/${type}/${hash}.${dynamic ? "gif" : format}?size=${size}`;
        return url;
    }
    async createInteractionResponse(id, token, type, data) {
        const builtApi = this.api().interactions(id, token).callback().post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = {
            type,
            data: data,
        };
        await (0, index_js_2.default)(req, this);
    }
    async getOriginalInteractionResponse(token) {
        const builtApi = this.api()
            .webhooks(this.user.id, token)
            .messages("@original")
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Message(res, this);
    }
    async editOriginalInteractionResponse(token, data) {
        const builtApi = this.api()
            .webhooks(this.user.id, token)
            .messages("@original")
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Message(res, this);
    }
    async deleteOriginalInteractionResponse(token) {
        const builtApi = this.api()
            .webhooks(this.user.id, token)
            .messages("@original")
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        await (0, index_js_2.default)(req, this);
    }
    async createFollowupMessage(token, data) {
        const builtApi = this.api().webhooks(this.user.id, token).post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res && new index_js_3.Message(res, this);
    }
    async getFollowupMessage(token, messageId) {
        const builtApi = this.api()
            .webhooks(this.user.id, token)
            .messages(messageId)
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return res && new index_js_3.Message(res, this);
    }
    async editFollowupMessage(token, messageId, data) {
        const builtApi = this.api()
            .webhooks(this.user.id, token)
            .messages(messageId)
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return res && new index_js_3.Message(res, this);
    }
    async deleteFollowupMessage(token, messageId) {
        const builtApi = this.api()
            .webhooks(this.user.id, token)
            .messages(messageId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        await (0, index_js_2.default)(req, this);
    }
    async getGlobalApplicationCommands(withLocalization) {
        const builtApi = this.api().applications(this.user.id).commands().get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (withLocalization)
            req.params = { withLocalization };
        const res = (await (0, index_js_2.default)(req, this));
        return res.map((command) => (0, helpers_js_1.convertToCamelCase)(command));
    }
    async createGlobalApplicationCommand(data) {
        const builtApi = this.api()
            .applications(this.user.id)
            .commands()
            .post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = (await (0, index_js_2.default)(req, this));
        return (res &&
            (0, helpers_js_1.convertToCamelCase)(res));
    }
    async getGlobalApplicationCommand(commandId) {
        const builtApi = this.api()
            .applications(this.user.id)
            .commands(commandId)
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = (await (0, index_js_2.default)(req, this));
        return (res &&
            (0, helpers_js_1.convertToCamelCase)(res));
    }
    async editGlobalApplicationCommand(commandId, data) {
        const builtApi = this.api()
            .applications(this.user.id)
            .commands(commandId)
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = (await (0, index_js_2.default)(req, this));
        return (res &&
            (0, helpers_js_1.convertToCamelCase)(res));
    }
    async deleteGlobalApplicationCommand(commandId) {
        const builtApi = this.api()
            .applications(this.user.id)
            .commands(commandId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        await (0, index_js_2.default)(req, this);
    }
    async bulkOverwriteGlobalApplicationCommands(data) {
        const builtApi = this.api().applications(this.user.id).commands().put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = (await (0, index_js_2.default)(req, this));
        return res.map((command) => (0, helpers_js_1.convertToCamelCase)(command));
    }
    async getGuildApplicationCommands(guildId, withLocalization) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands()
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (withLocalization)
            req.params = { withLocalization };
        const res = (await (0, index_js_2.default)(req, this));
        return res.map((command) => (0, helpers_js_1.convertToCamelCase)(command));
    }
    async createGuildApplicationCommand(guildId, data) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands()
            .post();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = (await (0, index_js_2.default)(req, this));
        return (res &&
            (0, helpers_js_1.convertToCamelCase)(res));
    }
    async getGuildApplicationCommand(guildId, commandId) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands(commandId)
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = (await (0, index_js_2.default)(req, this));
        return (res &&
            (0, helpers_js_1.convertToCamelCase)(res));
    }
    async editGuildApplicationCommand(guildId, commandId, data) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands(commandId)
            .patch();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = (await (0, index_js_2.default)(req, this));
        return (res &&
            (0, helpers_js_1.convertToCamelCase)(res));
    }
    async deleteGuildApplicationCommand(guildId, commandId) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands(commandId)
            .delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        await (0, index_js_2.default)(req, this);
    }
    async bulkOverwriteGuildApplicationCommands(guildId, data) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands()
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = (await (0, index_js_2.default)(req, this));
        return res.map((command) => (0, helpers_js_1.convertToCamelCase)(command));
    }
    async getGuildApplicationCommandPermissions(guildId) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands()
            .permissions()
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = (await (0, index_js_2.default)(req, this));
        return res.map((command) => (0, helpers_js_1.convertToCamelCase)(command));
    }
    async getApplicationCommandPermissions(guildId, commandId) {
        const builtApi = this.api()
            .applications(this.user.id)
            .guilds(guildId)
            .commands(commandId)
            .permissions()
            .get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = (await (0, index_js_2.default)(req, this));
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
}
exports.default = Client;
//# sourceMappingURL=index.js.map