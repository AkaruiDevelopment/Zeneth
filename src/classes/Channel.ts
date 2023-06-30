import Client from "../client/index.js";
import { ChannelTypes } from "../typings/enums.js";
import {
    CreateChannelInvitePayload,
    GroupDMAddRecipientPayload,
    ListArchivedThreadsPayload,
    MessagePayload,
    RawChannelData,
    RawChannelMessageOptions,
    RawDefaultReactionData,
    RawOverwriteData,
    RawTagData,
    RawThreadMemberData,
    RawThreadMetadataData,
    RawUserData,
    StartThreadInForumPayload,
    StartThreadPayload,
} from "../typings/interface.js";
import { Camelize, Snowflake, snowflake } from "../typings/types.js";
import {
    ConvertBigIntToHex,
    ConvertHexToBigInt,
    convertToCamelCase,
    parseSnowflake,
} from "../utils/helpers.js";

export default class Channel {
    videoQualityMode: number | undefined;
    applicationId: snowflake | undefined;
    appliedTags: string[] | undefined;
    availableTags: RawTagData[] | undefined;
    #client: Client;
    bitrate: number | undefined;
    defaultAutoArchiveDuration: number | undefined;
    defaultForumLayout: number | undefined;
    defaultReactionEmoji: RawDefaultReactionData[] | undefined;
    defaultSortOrder: number | undefined;
    defaultThreadRateLimitPerUser: number | undefined;
    flags: number | undefined;
    guildId: bigint | undefined;
    icon?: bigint;
    id: bigint;
    lastMessageId: bigint | undefined;
    lastPinTimestamp: string | undefined;
    member: Camelize<RawThreadMemberData> | undefined;
    memberCount: number | undefined;
    messageCount: number | undefined;
    name: string | undefined;
    nsfw: boolean | undefined;
    ownerId: bigint | undefined;
    parentId: bigint | undefined;
    permissionOverwrites:
        | RawOverwriteData[]
        | Camelize<RawOverwriteData[] | undefined>
        | Camelize<RawOverwriteData[] | undefined>[];
    permissions: string | undefined;
    position: number | undefined;
    rateLimitPerUser: number | undefined;
    recipients: RawUserData[] | undefined;
    rtcRegion: string | undefined;
    threadMetadata:
        | RawThreadMetadataData
        | Camelize<RawThreadMetadataData | undefined>
        | Camelize<RawThreadMetadataData | undefined>[];
    topic: string | null | undefined;
    totalMessageSent: number | undefined;
    type: ChannelTypes;
    userLimit: number | undefined;
    __priority: number;
    constructor(
        data: RawChannelData,
        client: Client,
        guildId?: snowflake | Snowflake,
    ) {
        this.#client = client;
        this.applicationId = data.application_id;
        this.appliedTags = data.applied_tags;
        this.availableTags = data.available_tags;
        this.bitrate = data.bitrate;
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.defaultForumLayout = data.default_forum_layout;
        this.defaultReactionEmoji = data.default_reaction_emoji;
        this.defaultSortOrder = data.default_sort_order;
        this.defaultThreadRateLimitPerUser =
            data.default_thread_rate_limit_per_user;
        this.flags = data.flags;
        this.guildId = data.guild_id
            ? BigInt(data.guild_id)
            : guildId
            ? BigInt(guildId)
            : undefined;
        this.icon = data.icon ? ConvertHexToBigInt(data.icon) : undefined;
        this.id = BigInt(data.id);
        this.lastMessageId = data.last_message_id
            ? BigInt(data.last_message_id)
            : undefined;
        this.lastPinTimestamp = data.last_pin_timestamp;
        this.member = data.member
            ? <Camelize<RawThreadMemberData>>convertToCamelCase(data.member)
            : undefined;
        this.memberCount = data.member_count;
        this.messageCount = data.message_count;
        this.name = data.name;
        this.nsfw = data.nsfw;
        this.ownerId = data.owner_id ? BigInt(data.owner_id) : undefined;
        this.parentId = data.parent_id ? BigInt(data.parent_id) : undefined;
        this.permissionOverwrites = convertToCamelCase(
            data.permission_overwrites,
        );
        this.permissions = data.permissions;
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.recipients = data.recipients;
        this.rtcRegion = data.rtc_region;
        this.threadMetadata = convertToCamelCase(data.thread_metadata);
        this.topic = data.topic;
        this.totalMessageSent = data.total_message_sent;
        this.type = data.type;
        this.userLimit = data.user_limit;
        this.videoQualityMode = data.video_quality_mode;
        this.__priority = 0;
        this.#clean();
    }
    /**
     * @example <Channel>.parsedSnowflake()
     */
    get parsedSnowflake() {
        return parseSnowflake(this.id);
    }
    #clean() {
        for (const key in this) if (this[key] === undefined) delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }

    updateThis(data: RawChannelData) {
        this.applicationId = data.application_id;
        this.appliedTags = data.applied_tags;
    }

    iconUrl(
        options = {
            size: 4096,
            format: "png",
            dynamic: true,
        },
    ) {
        if (!this.icon) return null;
        const { size, format, dynamic } = options;
        const hash = ConvertBigIntToHex(this.icon);
        const ext =
            dynamic && format === "png" && hash.startsWith("a_")
                ? "gif"
                : format;
        return `https://cdn.discordapp.com/avatars/${this.id}/${hash}.${ext}?size=${size}`;
    }
    createMessage(message: MessagePayload) {
        return this.#client.createMessage(this.id, message);
    }
    get() {
        return this.#client.getChannel(this.id);
    }
    update(data: Camelize<RawChannelData>, reason?: string) {
        return this.#client.updateChannel(this.id, data, reason);
    }
    delete(reason?: string) {
        return this.#client.deleteChannel(this.id, reason);
    }
    getMessages(options: RawChannelMessageOptions) {
        return this.#client.getChannelMessages(this.id, options);
    }
    getMessage(messageId: Snowflake) {
        return this.#client.getChannelMessage(this.id, messageId);
    }
    crosspostMessage(messageId: Snowflake, reason?: string) {
        return this.#client.crosspostMessage(this.id, messageId, reason);
    }
    deleteMessage(messageId: Snowflake, reason?: string) {
        return this.#client.deleteMessage(this.id, messageId, reason);
    }
    deleteBulkMessages(messageIds: Snowflake[], reason?: string) {
        return this.#client.deleteBulkMessages(this.id, messageIds, reason);
    }
    editMessage(messageId: Snowflake, data: MessagePayload) {
        return this.#client.editMessage(this.id, messageId, data);
    }
    createReaction(messageId: Snowflake, emoji: string) {
        return this.#client.createReaction(this.id, messageId, emoji);
    }
    deleteOwnReaction(messageId: Snowflake, emoji: string) {
        return this.#client.deleteOwnReaction(this.id, messageId, emoji);
    }
    deleteReaction(messageId: Snowflake, userId: Snowflake, emoji: string) {
        return this.#client.deleteReaction(this.id, messageId, userId, emoji);
    }
    getReactions(
        messageId: Snowflake,
        emoji: string,
        options: { limit?: number; after?: Snowflake },
    ) {
        return this.#client.getReactions(this.id, messageId, emoji, options);
    }
    deleteAllReactions(messageId: Snowflake) {
        return this.#client.deleteAllReactions(this.id, messageId);
    }
    deleteAllReactionsForEmoji(messageId: Snowflake, emoji: string) {
        return this.#client.deleteAllReactionsForEmoji(
            this.id,
            messageId,
            emoji,
        );
    }
    editPermissions(
        overwriteId: Snowflake,
        data: RawOverwriteData,
        reason?: string,
    ) {
        return this.#client.editChannelPermissions(
            this.id,
            overwriteId,
            data,
            reason,
        );
    }
    deletePermission(overwriteId: Snowflake, reason?: string) {
        return this.#client.deleteChannelPermission(
            this.id,
            overwriteId,
            reason,
        );
    }
    triggerTypingIndicator() {
        return this.#client.triggerTypingIndicator(this.id);
    }
    getInvites() {
        return this.#client.getChannelInvites(this.id);
    }
    createInvite(data: CreateChannelInvitePayload, reason?: string) {
        return this.#client.createChannelInvite(this.id, data, reason);
    }
    follow(webhookChannelId: Snowflake) {
        return this.#client.followAnnouncementChannel(
            this.id,
            webhookChannelId,
        );
    }
    getPinnedMessages() {
        return this.#client.getPinnedMessages(this.id);
    }
    pinMessage(messageId: Snowflake) {
        return this.#client.pinMessage(this.id, messageId);
    }
    unpinMessage(messageId: Snowflake) {
        return this.#client.unpinMessage(this.id, messageId);
    }
    groupAddRecipient(userId: Snowflake, data: GroupDMAddRecipientPayload) {
        return this.#client.groupDMAddRecipient(this.id, userId, data);
    }
    groupRemoveRecipient(userId: Snowflake) {
        return this.#client.groupDMRemoveRecipient(this.id, userId);
    }
    startThreadFromMessage(
        messageId: Snowflake,
        data: StartThreadPayload,
        reason?: string,
    ) {
        return this.#client.startThreadFromMessage(
            this.id,
            messageId,
            data,
            reason,
        );
    }
    startThreadInForum(data: StartThreadInForumPayload, reason?: string) {
        return this.#client.startThreadInForum(this.id, data, reason);
    }
    joinThread() {
        return this.#client.joinThread(this.id);
    }
    addThreadMember(userId: Snowflake) {
        return this.#client.addThreadMember(this.id, userId);
    }
    getThreadMember(userId: Snowflake) {
        return this.#client.getThreadMember(this.id, userId);
    }
    leaveThread() {
        return this.#client.leaveThread(this.id);
    }
    removeThreadMember(userId: Snowflake) {
        return this.#client.removeThreadMember(this.id, userId);
    }
    listThreadMembers() {
        return this.#client.listThreadMembers(this.id);
    }
    listPublicArchives(data: ListArchivedThreadsPayload) {
        return this.#client.listPublicArchivedThreads(this.id, data);
    }
    listPrivateArchives(data: ListArchivedThreadsPayload) {
        return this.#client.listPrivateArchivedThreads(this.id, data);
    }
    listJoinedPrivateArchives(data: ListArchivedThreadsPayload) {
        return this.#client.listJoinedPrivateArchivedThreads(this.id, data);
    }
}
