import { GatewayEventNames, MFALevel } from "../typings/enums.js";
import {
    ApplicationRoleConnectionMetadata,
    AutoModerationRule,
    ClientOptions,
    CreateChannelInvitePayload,
    EditChannelPermissionsPayload,
    GroupDMAddRecipientPayload,
    MessagePayload,
    RawApplicationData,
    RawChannelData,
    RawInviteData,
    RawMessageData,
    RawUserData,
    StartThreadInForumPayload,
    StartThreadPayload,
    requestOptions,
    ListArchivedThreadsPayload,
    CreateGuildEmojiPayload,
    RawChannelMessageOptions,
    CreateGuildPayload,
    RawGuildData,
    ModifyGuildChannelPositionsPayload,
    RawThreadMemberData,
    RawMemberData,
    ListGuildMembersPayload,
    SearchGuildMembersPayLoad,
    AddGuildMemberPayload,
    ModifyGuildMemberPayload,
    CreateGuildBanPayload,
    RawRoleData,
    GuildRolePayload,
    GetGuildPruneCountPayload,
    BeginGuildPrunePayload,
    ModifyGuildWidgetPayload,
    ModifyGuildWelcomeScreenPayload,
    ModifyCurrentUserVoiceStatePayload,
    ModifyUserVoiceStatePayload,
} from "../typings/interface.js";
import {
    Camelize,
    ClientEvents,
    ImageFormat,
    ImageSize,
    Snowflake,
    WidgetImageStyle,
    integer,
} from "../typings/types.js";
import Websocket from "../websocket/index.js";
import Api from "../utils/api.js";
import QueueManager from "../request/queue.js";
import request from "../request/index.js";
import {
    convertToCamelCase,
    convertUrlOrFileToBase64,
    createNullObject,
    parseDataToAoiLunaStandards,
    returnMessagePayload,
} from "../utils/helpers.js";

import {
    Channel,
    Emoji,
    Guild,
    Invite,
    Member,
    Message,
    Role,
    User,
} from "../classes/index.js";
export default class Client {
    #options: ClientOptions;
    ws: Websocket;
    #on: Partial<Record<GatewayEventNames, Function[]>> = {};
    api: typeof Api = Api;
    readyData!: {
        user: User;
        guilds: { id: string; unavailable?: boolean | undefined }[];
        resumeGatewayUrl: string;
        shard: [number, number] | undefined;
        sessionId: string;
        application: Camelize<RawApplicationData>;
    };
    queue: QueueManager;

    constructor(options: ClientOptions) {
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

    on<T extends GatewayEventNames>(event: T, callback: ClientEvents<T>) {
        if (!this.#on[event]) {
            this.#on[event] = [];
        }
        this.#on[event]?.push(callback);
    }

    get __on__() {
        return this.#on;
    }

    emit(event: GatewayEventNames, ...args: unknown[]) {
        for (const f of this.#on[event] ?? []) {
            f(...args);
        }
    }
    // ApplicationRoleConnectionMetadata
    async getApplicationRoleConnectionMetadataRecords(appId?: Snowflake) {
        const builtApi = this.api()
            .applications(appId ?? this.readyData.user.id, `role-connections`)
            .metadata()
            .get();
        const data: requestOptions = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    async updateApplicationRoleConnectionMetadataRecords(
        data: ApplicationRoleConnectionMetadata,
        appId?: Snowflake,
    ) {
        const builtApi = this.api()
            .applications(appId ?? this.readyData.user.id, `role-connections`)
            .metadata()
            .patch();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    // AuditLogs
    async getGuildAuditLogs(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId)["audit-logs"]().get();
        const data: requestOptions = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    // AutoModeration
    async listAutoModerationRules(guildId: Snowflake) {
        const builtApi = this.api()
            .guilds(guildId)
            ["auto-moderation"]()
            .rules()
            .get();
        const data: requestOptions = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    async getAutoModerationRule(guildId: Snowflake, ruleId: Snowflake) {
        const builtApi = this.api()
            .guilds(guildId)
            ["auto-moderation"]()
            .rules(ruleId)
            .get();
        const data: requestOptions = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return convertToCamelCase(res);
    }
    async createAutoModerationRule(
        guildId: Snowflake,
        data: AutoModerationRule,
        reason?: string,
    ) {
        const builtApi = this.api()
            .guilds(guildId)
            ["auto-moderation"]()
            .rules()
            .post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async updateAutoModerationRule(
        guildId: Snowflake,
        ruleId: Snowflake,
        data: AutoModerationRule,
        reason?: string,
    ) {
        const builtApi = this.api()
            .guilds(guildId)
            ["auto-moderation"]()
            .rules(ruleId)
            .patch();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteAutoModerationRule(
        guildId: Snowflake,
        ruleId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .guilds(guildId)
            ["auto-moderation"]()
            .rules(ruleId)
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    //Channel
    async getChannel(channelId: Snowflake) {
        const builtApi = this.api().channels(channelId).get();
        const data: requestOptions = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        const res = await request(data, this);
        return new Channel(res, this);
    }
    async updateChannel(
        channelId: Snowflake,
        data: Camelize<RawChannelData>,
        reason?: string,
    ) {
        const builtApi = this.api().channels(channelId).patch();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteChannel(channelId: Snowflake, reason?: string) {
        const builtApi = this.api().channels(channelId).delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async getChannelMessages(
        channelId: Snowflake,
        options?: RawChannelMessageOptions,
    ): Promise<Message[]> {
        const builtApi = this.api().channels(channelId).messages().get();
        const data: requestOptions = createNullObject();
        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;
        data.params = options;
        const res = await request(data, this);
        return res.map((message: RawMessageData) => new Message(message, this));
    }

    async getChannelMessage(channelId: Snowflake, messageId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .get();
        const data: requestOptions = createNullObject();

        data.url = builtApi.api;
        data.route = builtApi.route;
        data.method = builtApi.method;

        const res = await request(data, this);
        return new Message(res, this);
    }

    async createMessage(
        channelId: Snowflake,
        data: MessagePayload,
        reason?: string,
    ) {
        const builtApi = this.api().channels(channelId).messages().post();
        const req: requestOptions = createNullObject();
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
        else res = await request(req, this);
        return new Message(res, this);
    }

    async crosspostMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .crosspost()
            .post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Message(res, this);
    }

    async deleteMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async createReaction(
        channelId: Snowflake,
        messageId: Snowflake,
        emoji: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            ["@me"]()
            .put();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async deleteOwnReaction(
        channelId: Snowflake,
        messageId: Snowflake,
        emoji: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .me()
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async deleteReaction(
        channelId: Snowflake,
        messageId: Snowflake,
        userId: Snowflake,
        emoji: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .users(userId)
            .delete();

        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async getReactions(
        channelId: Snowflake,
        messageId: Snowflake,
        emoji: string,
        options?: { after?: Snowflake; limit?: number },
    ): Promise<User[]> {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = options;

        const res = await request(req, this);
        return res.map((x: RawUserData) => new User(x, this));
    }

    async deleteAllReactions(channelId: Snowflake, messageId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions()
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }
    async deleteAllReactionsForEmoji(
        channelId: Snowflake,
        messageId: Snowflake,
        emoji: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .reactions(encodeURIComponent(emoji))
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async editMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        data: MessagePayload,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .patch();
        const req: requestOptions = createNullObject();
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
        else res = await request(req, this);
        return new Message(res, this);
    }

    async deleteBulkMessages(
        channelId: Snowflake,
        messageIds: Snowflake[],
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages()
            .bulkDelete()
            .post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { messages: messageIds };

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async editChannelPermissions(
        channelId: Snowflake,
        overwriteId: Snowflake,
        data: EditChannelPermissionsPayload,
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .permissions(overwriteId)
            .put();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;
        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async getChannelInvites(channelId: Snowflake) {
        const builtApi = this.api().channels(channelId).invites().get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((x: RawInviteData) => new Invite(x, this));
    }

    async createChannelInvite(
        channelId: Snowflake,
        data: CreateChannelInvitePayload,
        reason?: string,
    ) {
        const builtApi = this.api().channels(channelId).invites().post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data ?? {};

        const res = await request(req, this);
        return new Invite(res, this);
    }

    async deleteChannelPermission(
        channelId: Snowflake,
        overwriteId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .permissions(overwriteId)
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async followAnnouncementChannel(
        channelId: Snowflake,
        webhookChannelId: Snowflake,
    ) {
        const builtApi = this.api().channels(channelId).followers().post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { webhookChannelId };

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async triggerTypingIndicator(channelId: Snowflake) {
        const builtApi = this.api().channels(channelId).typing().post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async getPinnedMessages(channelId: Snowflake) {
        const builtApi = this.api().channels(channelId).pins().get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((x: RawMessageData) => new Message(x, this));
    }

    async pinMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api().channels(channelId).pins(messageId).put();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async unpinMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .pins(messageId)
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async groupDMAddRecipient(
        channelId: Snowflake,
        userId: Snowflake,
        data: GroupDMAddRecipientPayload,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .recipients(userId)
            .put();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async groupDMRemoveRecipient(channelId: Snowflake, userId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            .recipients(userId)
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async startThreadFromMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        data: StartThreadPayload,
        reason?: string,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .messages(messageId)
            .threads()
            .post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Channel(res, this);
    }

    async startThreadWithoutMessage(
        channelId: Snowflake,
        data: StartThreadPayload,
        reason?: string,
    ) {
        const builtApi = this.api().channels(channelId).threads().post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Channel(res, this);
    }

    async startThreadInForum(
        channelId: Snowflake,
        data: StartThreadInForumPayload,
        reason?: string,
    ) {
        const builtApi = this.api().channels(channelId).threads().post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Channel(res, this);
    }

    async joinThread(channelId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            ["thread-members"]("@me")
            .put();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async addThreadMember(channelId: Snowflake, userId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            ["thread-members"](userId)
            .put();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async leaveThread(channelId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            ["thread-members"]("@me")
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async removeThreadMember(channelId: Snowflake, userId: Snowflake) {
        const builtApi = this.api()
            .channels(channelId)
            ["thread-members"](userId)
            .delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return convertToCamelCase(res);
    }

    async getThreadMember(
        channelId: Snowflake,
        userId: Snowflake,
        withMember = true,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            ["thread-members"](userId)
            .get();
        const req: requestOptions = createNullObject();
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

    async listThreadMembers(
        channelId: Snowflake,
        includeGuildMember?: boolean,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            ["thread-members"]()
            .get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (includeGuildMember !== undefined)
            req.params = { with_member: includeGuildMember };

        const res = await request(req, this);
        return res.map((member: any) => ({
            id: BigInt(member.id),
            userId: BigInt(member.user_id),
            joinTimestamp: new Date(member.join_timestamp),
            flags: member.flags,
            member: member.member ? new Member(member.member, this) : null,
        }));
    }

    async listPublicArchivedThreads(
        channelId: Snowflake,
        data?: ListArchivedThreadsPayload,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .threads()
            .archived("public")
            .get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);

        return {
            threads: res.threads.map(
                (thread: any) => new Channel(thread, this),
            ),
            members: res.members.map((member: any) => {
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

    async listPrivateArchivedThreads(
        channelId: Snowflake,
        data?: ListArchivedThreadsPayload,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .threads()
            .archived("private")
            .get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);

        return {
            threads: res.threads.map(
                (thread: any) => new Channel(thread, this),
            ),
            members: res.members.map((member: any) => {
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

    async listJoinedPrivateArchivedThreads(
        channelId: Snowflake,
        data?: ListArchivedThreadsPayload,
    ) {
        const builtApi = this.api()
            .channels(channelId)
            .users("@me")
            .threads()
            .archived("private")
            .get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);

        return {
            threads: res.threads.map(
                (thread: any) => new Channel(thread, this),
            ),
            members: res.members.map((member: any) => {
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

    async listGuildEmojis(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).emojis().get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((emoji: any) => new Emoji(emoji, this));
    }

    async getGuildEmoji(guildId: Snowflake, emojiId: Snowflake) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return new Emoji(res, this);
    }

    async createGuildEmoji(guildId: Snowflake, data: CreateGuildEmojiPayload) {
        const builtApi = this.api().guilds(guildId).emojis().post();
        const req: requestOptions = createNullObject();
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

    async modifyGuildEmoji(
        guildId: Snowflake,
        emojiId: Snowflake,
        data: Omit<CreateGuildEmojiPayload, "image">,
    ) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).patch();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return new Emoji(res, this);
    }

    async deleteGuildEmoji(guildId: Snowflake, emojiId: Snowflake) {
        const builtApi = this.api().guilds(guildId).emojis(emojiId).delete();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    // Guild

    async createGuild(data: CreateGuildPayload) {
        const builtApi = this.api().guilds().post();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return new Guild(res, this);
    }

    async getGuildPreview(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).preview().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return parseDataToAoiLunaStandards(convertToCamelCase(res));
    }

    async modifyGuild(
        guildId: Snowflake,
        data: Camelize<RawGuildData>,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Guild(res, this);
    }

    async deleteGuild(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).delete();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    async getGuild(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).get();

        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return new Guild(res, this);
    }

    async getGuildChannels(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).channels().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((channel: RawChannelData) => new Channel(channel, this));
    }

    async createGuildChannel(
        guildId: Snowflake,
        data: Camelize<RawChannelData>,
    ) {
        const builtApi = this.api().guilds(guildId).channels().post();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return new Channel(res, this);
    }

    async modifyGuildChannelPositions(
        guildId: Snowflake,
        data: ModifyGuildChannelPositionsPayload,
    ) {
        const builtApi = this.api().guilds(guildId).channels().patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
    }

    async listActiveGuildThreads(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).threads().active().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        res.threads = res.threads.map(
            (thread: RawChannelData) => new Channel(thread, this),
        );
        res.members = res.members.map((threadMember: RawThreadMemberData) => {
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

    async getGuildMember(guildId: Snowflake, userId: Snowflake) {
        const builtApi = this.api().guilds(guildId).members(userId).get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return new Member(res, this);
    }

    async listGuildMembers(guildId: Snowflake, data?: ListGuildMembersPayload) {
        const builtApi = this.api().guilds(guildId).members().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return res.map((member: RawMemberData) => new Member(member, this));
    }

    async searchGuildMembers(
        guildId: Snowflake,
        data: SearchGuildMembersPayLoad,
    ) {
        const builtApi = this.api().guilds(guildId).members().search().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return res.map((member: RawMemberData) => new Member(member, this));
    }

    async addGuildMember(
        guildId: Snowflake,
        userId: Snowflake,
        data: AddGuildMemberPayload,
    ) {
        const builtApi = this.api().guilds(guildId).members(userId).put();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }

    async modifyGuildMember(
        guildId: Snowflake,
        userId: Snowflake,
        data: ModifyGuildMemberPayload,
    ) {
        const builtApi = this.api().guilds(guildId).members(userId).patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }

    async modifyCurrentUserNick(
        guildId: Snowflake,
        nick?: string,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).members("@me").patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { nick };
        req.auditLogReason = reason;

        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }

    async addGuildMemberRole(
        guildId: Snowflake,
        userId: Snowflake,
        roleId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .guilds(guildId)
            .members(userId)
            .roles(roleId)
            .put();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }

    async removeGuildMemberRole(
        guildId: Snowflake,
        userId: Snowflake,
        roleId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api()
            .guilds(guildId)
            .members(userId)
            .roles(roleId)
            .delete();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return res ? new Member(res, this) : null;
    }

    async removeGuildMember(
        guildId: Snowflake,
        userId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).members(userId).delete();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    async getGuildBans(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).bans().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((ban: { reason?: string; user: RawUserData }) => {
            return {
                reason: ban.reason,
                user: new User(ban.user, this),
            };
        });
    }

    async getGuildBan(guildId: Snowflake, userId: Snowflake) {
        const builtApi = this.api().guilds(guildId).bans(userId).get();
        const req: requestOptions = createNullObject();

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

    async createGuildBan(
        guildId: Snowflake,
        userId: Snowflake,
        data: CreateGuildBanPayload,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).bans(userId).put();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;
        req.params = data;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    async removeGuildBan(
        guildId: Snowflake,
        userId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).bans(userId).delete();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.auditLogReason = reason;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    async getGuildRoles(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).roles().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((role: RawRoleData) => new Role(role, this));
    }

    async createGuildRole(guildId: Snowflake, data: GuildRolePayload) {
        const builtApi = this.api().guilds(guildId).roles().post();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data) req.params = data;

        const res = await request(req, this);
        return new Role(res, this);
    }

    async modifyGuildRolePositions(
        guildId: Snowflake,
        roleId: Snowflake,
        position: integer,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).roles().patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = { id: roleId, position };
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Role(res, this);
    }

    async modifyGuildRole(
        guildId: Snowflake,
        roleId: Snowflake,
        data: GuildRolePayload,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).roles(roleId).patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data) req.params = data;
        req.auditLogReason = reason;

        const res = await request(req, this);
        return new Role(res, this);
    }

    async deleteGuildRole(
        guildId: Snowflake,
        roleId: Snowflake,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).roles(roleId).delete();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    async modifyGuildMFALevel(
        guildId: Snowflake,
        level: MFALevel,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).mfa().patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = { level };

        const res = await request(req, this);
        return new Guild(res, this);
    }

    async getGuildPruneCount(
        guildId: Snowflake,
        data?: GetGuildPruneCountPayload,
    ) {
        const builtApi = this.api().guilds(guildId).prune().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        if (data) req.params = data;

        const res = await request(req, this);
        return res.pruned;
    }

    async beginGuildPrune(
        guildId: Snowflake,
        data?: BeginGuildPrunePayload,
        reason?: string,
    ) {
        const builtApi = this.api().guilds(guildId).prune().post();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        if (data) req.params = data;

        const res = await request(req, this);
        return res.pruned;
    }

    async getGuildVoiceRegions(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).regions().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return await request(req, this);
    }

    async getGuildInvites(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).invites().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return res.map((invite: RawInviteData) => new Invite(invite, this));
    }

    async getGuildIntegrations(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).integrations().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return convertToCamelCase(await request(req, this));
    }

    async deleteGuildIntegration( guildId: Snowflake, integrationId: Snowflake, reason?: string, ) {
        const builtApi = this.api().guilds(guildId).integrations(integrationId).delete();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;

        return await request(req, this)
            .catch((e) => false)
            .then((e) => true);
    }

    async getGuildWidgetSettings(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId).widget().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return convertToCamelCase(await request(req, this));
    }

    async modifyGuildWidget( guildId: Snowflake, data: ModifyGuildWidgetPayload, reason?: string, ) {
        const builtApi = this.api().guilds(guildId).widget().patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = data;

        return convertToCamelCase(await request(req, this));
    }

    async getGuildWidget(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId)["widget.json"]().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return await request(req, this);
    }

    async getGuildVanityUrl(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId)["vanity-url"]().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return await request(req, this);
    }

    async getGuildWidgetImage(guildId: Snowflake, style?: WidgetImageStyle) {
        const builtApi = this.api().guilds(guildId)["widget.png"]().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.params = { style };
        req.method = builtApi.method;

        return await request(req, this);
    }

    async getGuildWelcomeScreen(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId)["welcome-screen"]().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }

    async modifyGuildWelcomeScreen( guildId: Snowflake, data: ModifyGuildWelcomeScreenPayload, reason?: string, ) {
        const builtApi = this.api().guilds(guildId)["welcome-screen"]().patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.auditLogReason = reason;
        req.method = builtApi.method;
        req.params = data;

        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }

    async getGuildOnBoarding(guildId: Snowflake) {
        const builtApi = this.api().guilds(guildId)["onboarding-application"]().get();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }

    async modifyCurrentUserVoiceState( guildId: Snowflake, data: ModifyCurrentUserVoiceStatePayload, ) {
        const builtApi = this.api().guilds(guildId)["voice-states"]("@me").patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }

    async modifyUserVoiceState( guildId: Snowflake, userId: Snowflake, data: ModifyUserVoiceStatePayload, ) {
        const builtApi = this.api().guilds(guildId)["voice-states"](userId).patch();
        const req: requestOptions = createNullObject();

        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;
        req.params = data;

        return parseDataToAoiLunaStandards(convertToCamelCase(await request(req, this)));
    }


    // User

    async getUser(userId: Snowflake) {
        const builtApi = this.api().users(userId).get();
        const req: requestOptions = createNullObject();
        req.url = builtApi.api;
        req.route = builtApi.route;
        req.method = builtApi.method;

        const res = await request(req, this);
        return new User(res, this);
    }

    getUrlFromHash(
        hash: string,
        type: "avatar" | "banner" | "icon" | "splash",
        size: ImageSize = 1024,
        format: ImageFormat = "webp",
        dynamic = true,
    ) {
        const url = `https://cdn.discordapp.com/${type}/${hash}.${
            dynamic ? "gif" : format
        }?size=${size}`;
        return url;
    }

    
}
