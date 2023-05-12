import { ConvertBigIntToHex, ConvertHexToBigInt, convertToCamelCase, parseSnowflake } from '../utils/helpers.js';
export default class Channel {
    videoQualityMode;
    applicationId;
    appliedTags;
    availableTags;
    #client;
    bitrate;
    defaultAutoArchiveDuration;
    defaultForumLayout;
    defaultReactionEmoji;
    defaultSortOrder;
    defaultThreadRateLimitPerUser;
    flags;
    guildId;
    icon;
    id;
    lastMessageId;
    lastPinTimestamp;
    member;
    memberCount;
    messageCount;
    name;
    nsfw;
    ownerId;
    parentId;
    permissionOverwrites;
    permissions;
    position;
    rateLimitPerUser;
    recipients;
    rtcRegion;
    threadMetadata;
    topic;
    totalMessageSent;
    type;
    userLimit;
    __priority;
    constructor(data, client, guildId) {
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
        this.guildId = data.guild_id ? BigInt(data.guild_id) : guildId ? BigInt(guildId) : undefined;
        this.icon = data.icon ? ConvertHexToBigInt(data.icon) : undefined;
        this.id = BigInt(data.id);
        this.lastMessageId = data.last_message_id ? BigInt(data.last_message_id) : undefined;
        this.lastPinTimestamp = data.last_pin_timestamp;
        this.member = data.member ? convertToCamelCase(data.member) : undefined;
        this.memberCount = data.member_count;
        this.messageCount = data.message_count;
        this.name = data.name;
        this.nsfw = data.nsfw;
        this.ownerId = data.owner_id ? BigInt(data.owner_id) : undefined;
        this.parentId = data.parent_id ? BigInt(data.parent_id) : undefined;
        this.permissionOverwrites = convertToCamelCase(data.permission_overwrites);
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
    get parsedSnowflake() {
        return parseSnowflake(this.id);
    }
    #clean() {
        for (const key in this)
            if (this[key] === undefined)
                delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }
    updateThis(data) {
        this.applicationId = data.application_id;
        this.appliedTags = data.applied_tags;
    }
    iconUrl(options = {
        size: 4096,
        format: 'png',
        dynamic: true,
    }) {
        if (!this.icon)
            return null;
        const { size, format, dynamic } = options;
        const hash = ConvertBigIntToHex(this.icon);
        const ext = dynamic && format === 'png' && hash.startsWith('a_') ? 'gif' : format;
        return `https://cdn.discordapp.com/avatars/${this.id}/${hash}.${ext}?size=${size}`;
    }
    createMessage(message) {
        return this.#client.createMessage(this.id, message);
    }
    get() {
        return this.#client.getChannel(this.id);
    }
    update(data, reason) {
        return this.#client.updateChannel(this.id, data, reason);
    }
    delete(reason) {
        return this.#client.deleteChannel(this.id, reason);
    }
    getMessages(options) {
        return this.#client.getChannelMessages(this.id, options);
    }
    getMessage(messageId) {
        return this.#client.getChannelMessage(this.id, messageId);
    }
    crosspostMessage(messageId, reason) {
        return this.#client.crosspostMessage(this.id, messageId, reason);
    }
    deleteMessage(messageId, reason) {
        return this.#client.deleteMessage(this.id, messageId, reason);
    }
    deleteBulkMessages(messageIds, reason) {
        return this.#client.deleteBulkMessages(this.id, messageIds, reason);
    }
    editMessage(messageId, data) {
        return this.#client.editMessage(this.id, messageId, data);
    }
    createReaction(messageId, emoji) {
        return this.#client.createReaction({
            channelId: this.id,
            messageId,
            emoji,
        });
    }
    deleteOwnReaction(messageId, emoji) {
        return this.#client.deleteOwnReaction({
            channelId: this.id,
            messageId,
            emoji,
        });
    }
    deleteReaction(messageId, userId, emoji) {
        return this.#client.deleteReaction({
            channelId: this.id,
            messageId,
            emoji,
            userId,
        });
    }
    getReactions(messageId, emoji, options) {
        return this.#client.getReactions({
            channelId: this.id,
            messageId,
            emoji,
            options,
        });
    }
    deleteAllReactions(messageId) {
        return this.#client.deleteAllReactions(this.id, messageId);
    }
    deleteAllReactionsForEmoji(messageId, emoji) {
        return this.#client.deleteAllReactionsForEmoji({
            channelId: this.id,
            messageId,
            emoji,
        });
    }
    editPermissions(overwriteId, data, reason) {
        return this.#client.editChannelPermissions(this.id, overwriteId, data, reason);
    }
    deletePermission(overwriteId, reason) {
        return this.#client.deleteChannelPermission(this.id, overwriteId, reason);
    }
    triggerTypingIndicator() {
        return this.#client.triggerTypingIndicator(this.id);
    }
    getInvites() {
        return this.#client.getChannelInvites(this.id);
    }
    createInvite(data, reason) {
        return this.#client.createChannelInvite(this.id, data, reason);
    }
    follow(webhookChannelId) {
        return this.#client.followAnnouncementChannel(this.id, webhookChannelId);
    }
    getPinnedMessages() {
        return this.#client.getPinnedMessages(this.id);
    }
    pinMessage(messageId) {
        return this.#client.pinMessage(this.id, messageId);
    }
    unpinMessage(messageId) {
        return this.#client.unpinMessage(this.id, messageId);
    }
    groupAddRecipient(userId, data) {
        return this.#client.groupDMAddRecipient(this.id, userId, data);
    }
    groupRemoveRecipient(userId) {
        return this.#client.groupDMRemoveRecipient(this.id, userId);
    }
    startThreadFromMessage(messageId, data, reason) {
        return this.#client.startThreadFromMessage(this.id, messageId, data, reason);
    }
    startThreadInForum(data, reason) {
        return this.#client.startThreadInForum(this.id, data, reason);
    }
    joinThread() {
        return this.#client.joinThread(this.id);
    }
    addThreadMember(userId) {
        return this.#client.addThreadMember(this.id, userId);
    }
    getThreadMember(userId) {
        return this.#client.getThreadMember(this.id, userId);
    }
    leaveThread() {
        return this.#client.leaveThread(this.id);
    }
    removeThreadMember(userId) {
        return this.#client.removeThreadMember(this.id, userId);
    }
    listThreadMembers() {
        return this.#client.listThreadMembers(this.id);
    }
    listPublicArchives(data) {
        return this.#client.listPublicArchivedThreads(this.id, data);
    }
    listPrivateArchives(data) {
        return this.#client.listPrivateArchivedThreads(this.id, data);
    }
    listJoinedPrivateArchives(data) {
        return this.#client.listJoinedPrivateArchivedThreads(this.id, data);
    }
}
//# sourceMappingURL=Channel.js.map