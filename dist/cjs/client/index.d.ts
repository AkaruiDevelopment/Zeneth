import { GatewayEventNames } from '../typings/enums.js';
import { ApplicationRoleConnectionMetadata, AutoModerationRule, ClientOptions, CreateChannelInvitePayload, EditChannelPermissionsPayload, GroupDMAddRecipientPayload, MessagePayload, RawApplicationData, RawChannelData, StartThreadInForumPayload, StartThreadPayload, ListArchivedThreadsPayload, CreateGuildEmojiPayload, RawChannelMessageOptions } from '../typings/interface.js';
import { Camelize, ClientEvents, Snowflake } from '../typings/types.js';
import Websocket from '../websocket/index.js';
import Api from '../utils/api.js';
import QueueManager from '../request/queue.js';
import { Channel, Emoji, Guild, Invite, Member, Message, User } from '../classes/index.js';
export default class Client {
    #private;
    ws: Websocket;
    api: typeof Api;
    readyData: {
        user: User;
        guilds: {
            id: string;
            unavailable?: boolean | undefined;
        }[];
        resumeGatewayUrl: string;
        shard: [number, number] | undefined;
        sessionId: string;
        application: Camelize<RawApplicationData>;
    };
    queue: QueueManager;
    constructor(options: ClientOptions);
    get token(): `${string}.${string}.${string}`;
    get intents(): number;
    get options(): ClientOptions;
    get user(): User;
    on<T extends GatewayEventNames>(event: T, callback: ClientEvents<T>): void;
    get __on__(): Partial<Record<GatewayEventNames, Function[]>>;
    emit(event: GatewayEventNames, ...args: unknown[]): void;
    getApplicationRoleConnectionMetadataRecords(appId?: Snowflake): Promise<any>;
    updateApplicationRoleConnectionMetadataRecords(data: ApplicationRoleConnectionMetadata, appId?: Snowflake): Promise<any>;
    getGuildAuditLogs(guildId: Snowflake): Promise<any>;
    listAutoModerationRules(guildId: Snowflake): Promise<any>;
    getAutoModerationRule(guildId: Snowflake, ruleId: Snowflake): Promise<any>;
    createAutoModerationRule(guildId: Snowflake, data: AutoModerationRule, reason?: string): Promise<any>;
    updateAutoModerationRule(guildId: Snowflake, ruleId: Snowflake, data: AutoModerationRule, reason?: string): Promise<any>;
    deleteAutoModerationRule(guildId: Snowflake, ruleId: Snowflake, reason?: string): Promise<any>;
    getChannel(channelId: Snowflake): Promise<Channel>;
    updateChannel(channelId: Snowflake, data: Camelize<RawChannelData>, reason?: string): Promise<any>;
    deleteChannel(channelId: Snowflake, reason?: string): Promise<any>;
    getChannelMessages(channelId: Snowflake, options?: RawChannelMessageOptions): Promise<Message[]>;
    getChannelMessage(channelId: Snowflake, messageId: Snowflake): Promise<Message>;
    createMessage(channelId: Snowflake, data: MessagePayload, reason?: string): Promise<Message>;
    crosspostMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<Message>;
    deleteMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<any>;
    createReaction({ channelId, messageId, emoji, }: {
        channelId: Snowflake;
        messageId: Snowflake;
        emoji: string;
    }): Promise<any>;
    deleteOwnReaction({ channelId, messageId, emoji, }: {
        channelId: Snowflake;
        messageId: Snowflake;
        emoji: string;
    }): Promise<any>;
    deleteReaction({ channelId, messageId, emoji, userId, }: {
        channelId: Snowflake;
        messageId: Snowflake;
        emoji: string;
        userId: Snowflake;
    }): Promise<any>;
    getReactions({ channelId, messageId, emoji, options, }: {
        channelId: Snowflake;
        messageId: Snowflake;
        emoji: string;
        options?: {
            after?: Snowflake;
            limit?: number;
        };
    }): Promise<User[]>;
    deleteAllReactions(channelId: Snowflake, messageId: Snowflake): Promise<any>;
    deleteAllReactionsForEmoji({ channelId, messageId, emoji, }: {
        channelId: Snowflake;
        messageId: Snowflake;
        emoji: string;
    }): Promise<any>;
    editMessage(channelId: Snowflake, messageId: Snowflake, data: MessagePayload): Promise<Message>;
    deleteBulkMessages(channelId: Snowflake, messageIds: Snowflake[], reason?: string): Promise<any>;
    editChannelPermissions(channelId: Snowflake, overwriteId: Snowflake, data: EditChannelPermissionsPayload, reason?: string): Promise<any>;
    getChannelInvites(channelId: Snowflake): Promise<any>;
    createChannelInvite(channelId: Snowflake, data: CreateChannelInvitePayload, reason?: string): Promise<Invite>;
    deleteChannelPermission(channelId: Snowflake, overwriteId: Snowflake, reason?: string): Promise<any>;
    followAnnouncementChannel(channelId: Snowflake, webhookChannelId: Snowflake): Promise<any>;
    triggerTypingIndicator(channelId: Snowflake): Promise<any>;
    getPinnedMessages(channelId: Snowflake): Promise<any>;
    pinMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<any>;
    unpinMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<any>;
    groupDMAddRecipient(channelId: Snowflake, userId: Snowflake, data: GroupDMAddRecipientPayload): Promise<any>;
    groupDMRemoveRecipient(channelId: Snowflake, userId: Snowflake): Promise<any>;
    startThreadFromMessage(channelId: Snowflake, messageId: Snowflake, data: StartThreadPayload, reason?: string): Promise<Channel>;
    startThreadWithoutMessage(channelId: Snowflake, data: StartThreadPayload, reason?: string): Promise<Channel>;
    startThreadInForum(channelId: Snowflake, data: StartThreadInForumPayload, reason?: string): Promise<Channel>;
    joinThread(channelId: Snowflake): Promise<any>;
    addThreadMember(channelId: Snowflake, userId: Snowflake): Promise<any>;
    leaveThread(channelId: Snowflake): Promise<any>;
    removeThreadMember(channelId: Snowflake, userId: Snowflake): Promise<any>;
    getThreadMember(channelId: Snowflake, userId: Snowflake, withMember?: boolean): Promise<{
        id: bigint;
        userId: bigint;
        joinTimestamp: Date;
        flags: any;
        member: Member | null;
    }>;
    listThreadMembers(channelId: Snowflake, includeGuildMember?: boolean): Promise<any>;
    listPublicArchivedThreads(channelId: Snowflake, data?: ListArchivedThreadsPayload): Promise<{
        threads: any;
        members: any;
        hasMore: any;
    }>;
    listPrivateArchivedThreads(channelId: Snowflake, data?: ListArchivedThreadsPayload): Promise<{
        threads: any;
        members: any;
        hasMore: any;
    }>;
    listJoinedPrivateArchivedThreads(channelId: Snowflake, data?: ListArchivedThreadsPayload): Promise<{
        threads: any;
        members: any;
        hasMore: any;
    }>;
    listGuildEmojis(guildId: Snowflake): Promise<any>;
    getGuildEmoji(guildId: Snowflake, emojiId: Snowflake): Promise<Emoji>;
    createGuildEmoji(guildId: Snowflake, data: CreateGuildEmojiPayload): Promise<Emoji>;
    modifyGuildEmoji(guildId: Snowflake, emojiId: Snowflake, data: Omit<CreateGuildEmojiPayload, 'image'>): Promise<Emoji>;
    deleteGuildEmoji(guildId: Snowflake, emojiId: Snowflake): Promise<boolean>;
    getGuild(guildId: Snowflake): Promise<Guild>;
}
//# sourceMappingURL=index.d.ts.map