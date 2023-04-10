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
    // ApplicationRoleConnectionMetadata
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
    // AuditLogs
    async getGuildAuditLogs(guildId) {
        const builtApi = this.api().guilds(guildId)['audit-logs']().get();
        const data = (0, helpers_js_1.createNullObject)();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await (0, index_js_2.default)(data, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    // AutoModeration
    async listAutoModerationRules(guildId) {
        const builtApi = this.api()
            .guilds(guildId)['auto-moderation']()
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
            .guilds(guildId)['auto-moderation']()
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
            .guilds(guildId)['auto-moderation']()
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
            .guilds(guildId)['auto-moderation']()
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
            .guilds(guildId)['auto-moderation']()
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
    //Channel
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
        const builtApi = this.api().channels(channelId).messages(messageId).get();
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
                'Content-Type': undefined,
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
    async createReaction({ channelId, messageId, emoji, }) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))['@me']()
            .put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async deleteOwnReaction({ channelId, messageId, emoji, }) {
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
    async deleteReaction({ channelId, messageId, emoji, userId, }) {
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
    async getReactions({ channelId, messageId, emoji, options, }) {
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
    async deleteAllReactionsForEmoji({ channelId, messageId, emoji, }) {
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
        const builtApi = this.api().channels(channelId).messages(messageId).patch();
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
                'Content-Type': undefined,
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
        const builtApi = this.api().channels(channelId).pins(messageId).delete();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async groupDMAddRecipient(channelId, userId, data) {
        const builtApi = this.api().channels(channelId).recipients(userId).put();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await (0, index_js_2.default)(req, this);
        return (0, helpers_js_1.convertToCamelCase)(res);
    }
    async groupDMRemoveRecipient(channelId, userId) {
        const builtApi = this.api().channels(channelId).recipients(userId).delete();
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
            .channels(channelId)['thread-members']('@me')
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
            .channels(channelId)['thread-members'](userId)
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
            .channels(channelId)['thread-members']('@me')
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
            .channels(channelId)['thread-members'](userId)
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
            .channels(channelId)['thread-members'](userId)
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
        const builtApi = this.api().channels(channelId)['thread-members']().get();
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
        const builtApi = this.api().channels(channelId).threads().archived('public').get();
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
                    joinTimestamp: member.join_timestamp ? new Date(member.join_timestamp) : undefined,
                    flags: member.flags,
                    member: member.member ? new index_js_3.Member(member.member, this) : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    async listPrivateArchivedThreads(channelId, data) {
        const builtApi = this.api().channels(channelId).threads().archived('private').get();
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
                    joinTimestamp: member.join_timestamp ? new Date(member.join_timestamp) : undefined,
                    flags: member.flags,
                    member: member.member ? new index_js_3.Member(member.member, this) : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    async listJoinedPrivateArchivedThreads(channelId, data) {
        const builtApi = this.api().channels(channelId).users('@me').threads().archived('private').get();
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
                    joinTimestamp: member.join_timestamp ? new Date(member.join_timestamp) : undefined,
                    flags: member.flags,
                    member: member.member ? new index_js_3.Member(member.member, this) : undefined,
                };
            }),
            hasMore: res.has_more,
        };
    }
    // Emoji
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
        return await (0, index_js_2.default)(req, this).catch((e) => false).then(e => true);
    }
    // Guild
    async getGuild(guildId) {
        const builtApi = this.api().guilds(guildId).get();
        const req = (0, helpers_js_1.createNullObject)();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        const res = await (0, index_js_2.default)(req, this);
        return new index_js_3.Guild(res, this);
    }
}
exports.default = Client;
//# sourceMappingURL=index.js.map