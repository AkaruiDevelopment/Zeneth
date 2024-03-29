import { GatewayEventNames, InteractionTypes, MFALevel } from "../typings/enums.js";
import { ApplicationRoleConnectionMetadata, AutoModerationRule, ClientOptions, CreateChannelInvitePayload, EditChannelPermissionsPayload, GroupDMAddRecipientPayload, MessagePayload, RawApplicationData, RawChannelData, StartThreadInForumPayload, StartThreadPayload, ListArchivedThreadsPayload, CreateGuildEmojiPayload, RawChannelMessageOptions, CreateGuildPayload, RawGuildData, ModifyGuildChannelPositionsPayload, ListGuildMembersPayload, SearchGuildMembersPayLoad, AddGuildMemberPayload, ModifyGuildMemberPayload, CreateGuildBanPayload, GuildRolePayload, GetGuildPruneCountPayload, BeginGuildPrunePayload, ModifyGuildWidgetPayload, ModifyGuildWelcomeScreenPayload, ModifyCurrentUserVoiceStatePayload, ModifyUserVoiceStatePayload, InteractionResponsePayload, CreateApplicationCommandPayload, RawGuildApplicationCommandPermissions } from "../typings/interface.js";
import { Camelize, ClientEvents, ImageFormat, ImageSize, Snowflake, WidgetImageStyle, integer } from "../typings/types.js";
import Websocket from "../websocket/index.js";
import Api from "../utils/api.js";
import QueueManager from "../request/queue.js";
import { Channel, Emoji, Guild, Invite, Member, Message, Role, User } from "../classes/index.js";
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
    createReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<any>;
    deleteOwnReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<any>;
    deleteReaction(channelId: Snowflake, messageId: Snowflake, userId: Snowflake, emoji: string): Promise<any>;
    getReactions(channelId: Snowflake, messageId: Snowflake, emoji: string, options?: {
        after?: Snowflake;
        limit?: number;
    }): Promise<User[]>;
    deleteAllReactions(channelId: Snowflake, messageId: Snowflake): Promise<any>;
    deleteAllReactionsForEmoji(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<any>;
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
    modifyGuildEmoji(guildId: Snowflake, emojiId: Snowflake, data: Omit<CreateGuildEmojiPayload, "image">): Promise<Emoji>;
    deleteGuildEmoji(guildId: Snowflake, emojiId: Snowflake): Promise<boolean>;
    createGuild(data: CreateGuildPayload): Promise<Guild>;
    getGuildPreview(guildId: Snowflake): Promise<any>;
    modifyGuild(guildId: Snowflake, data: Camelize<RawGuildData>, reason?: string): Promise<Guild>;
    deleteGuild(guildId: Snowflake): Promise<boolean>;
    getGuild(guildId: Snowflake): Promise<Guild>;
    getGuildChannels(guildId: Snowflake): Promise<any>;
    createGuildChannel(guildId: Snowflake, data: Camelize<RawChannelData>): Promise<Channel>;
    modifyGuildChannelPositions(guildId: Snowflake, data: ModifyGuildChannelPositionsPayload): Promise<void>;
    listActiveGuildThreads(guildId: Snowflake): Promise<any>;
    getGuildMember(guildId: Snowflake, userId: Snowflake): Promise<Member>;
    listGuildMembers(guildId: Snowflake, data?: ListGuildMembersPayload): Promise<any>;
    searchGuildMembers(guildId: Snowflake, data: SearchGuildMembersPayLoad): Promise<any>;
    addGuildMember(guildId: Snowflake, userId: Snowflake, data: AddGuildMemberPayload): Promise<Member | null>;
    modifyGuildMember(guildId: Snowflake, userId: Snowflake, data: ModifyGuildMemberPayload): Promise<Member | null>;
    modifyCurrentUserNick(guildId: Snowflake, nick?: string, reason?: string): Promise<Member | null>;
    addGuildMemberRole(guildId: Snowflake, userId: Snowflake, roleId: Snowflake, reason?: string): Promise<Member | null>;
    removeGuildMemberRole(guildId: Snowflake, userId: Snowflake, roleId: Snowflake, reason?: string): Promise<Member | null>;
    removeGuildMember(guildId: Snowflake, userId: Snowflake, reason?: string): Promise<boolean>;
    getGuildBans(guildId: Snowflake): Promise<any>;
    getGuildBan(guildId: Snowflake, userId: Snowflake): Promise<{
        reason: any;
        user: User;
    } | null>;
    createGuildBan(guildId: Snowflake, userId: Snowflake, data: CreateGuildBanPayload, reason?: string): Promise<boolean>;
    removeGuildBan(guildId: Snowflake, userId: Snowflake, reason?: string): Promise<boolean>;
    getGuildRoles(guildId: Snowflake): Promise<any>;
    createGuildRole(guildId: Snowflake, data: GuildRolePayload): Promise<Role>;
    modifyGuildRolePositions(guildId: Snowflake, roleId: Snowflake, position: integer, reason?: string): Promise<Role>;
    modifyGuildRole(guildId: Snowflake, roleId: Snowflake, data: GuildRolePayload, reason?: string): Promise<Role>;
    deleteGuildRole(guildId: Snowflake, roleId: Snowflake, reason?: string): Promise<boolean>;
    modifyGuildMFALevel(guildId: Snowflake, level: MFALevel, reason?: string): Promise<Guild>;
    getGuildPruneCount(guildId: Snowflake, data?: GetGuildPruneCountPayload): Promise<any>;
    beginGuildPrune(guildId: Snowflake, data?: BeginGuildPrunePayload, reason?: string): Promise<any>;
    getGuildVoiceRegions(guildId: Snowflake): Promise<any>;
    getGuildInvites(guildId: Snowflake): Promise<any>;
    getGuildIntegrations(guildId: Snowflake): Promise<any>;
    deleteGuildIntegration(guildId: Snowflake, integrationId: Snowflake, reason?: string): Promise<boolean>;
    getGuildWidgetSettings(guildId: Snowflake): Promise<any>;
    modifyGuildWidget(guildId: Snowflake, data: ModifyGuildWidgetPayload, reason?: string): Promise<any>;
    getGuildWidget(guildId: Snowflake): Promise<any>;
    getGuildVanityUrl(guildId: Snowflake): Promise<any>;
    getGuildWidgetImage(guildId: Snowflake, style?: WidgetImageStyle): Promise<any>;
    getGuildWelcomeScreen(guildId: Snowflake): Promise<any>;
    modifyGuildWelcomeScreen(guildId: Snowflake, data: ModifyGuildWelcomeScreenPayload, reason?: string): Promise<any>;
    getGuildOnBoarding(guildId: Snowflake): Promise<any>;
    modifyCurrentUserVoiceState(guildId: Snowflake, data: ModifyCurrentUserVoiceStatePayload): Promise<any>;
    modifyUserVoiceState(guildId: Snowflake, userId: Snowflake, data: ModifyUserVoiceStatePayload): Promise<any>;
    getUser(userId: Snowflake): Promise<User>;
    getUrlFromHash(hash: string, type: "avatar" | "banner" | "icon" | "splash", size?: ImageSize, format?: ImageFormat, dynamic?: boolean): string;
    createInteractionResponse(id: Snowflake, token: string, type: InteractionTypes, data?: InteractionResponsePayload): Promise<void>;
    getOriginalInteractionResponse(token: string): Promise<Message>;
    editOriginalInteractionResponse(token: string, data: InteractionResponsePayload): Promise<Message>;
    deleteOriginalInteractionResponse(token: string): Promise<void>;
    createFollowupMessage(token: string, data: InteractionResponsePayload): Promise<any>;
    getFollowupMessage(token: string, messageId: Snowflake): Promise<any>;
    editFollowupMessage(token: string, messageId: Snowflake, data: InteractionResponsePayload): Promise<any>;
    deleteFollowupMessage(token: string, messageId: Snowflake): Promise<void>;
    getGlobalApplicationCommands(withLocalization?: boolean): Promise<Camelize<RawApplicationData>[]>;
    createGlobalApplicationCommand(data: CreateApplicationCommandPayload): Promise<Camelize<RawApplicationData> | undefined>;
    getGlobalApplicationCommand(commandId: Snowflake): Promise<Camelize<RawApplicationData> | undefined>;
    editGlobalApplicationCommand(commandId: Snowflake, data: Omit<CreateApplicationCommandPayload, "type">): Promise<Camelize<RawApplicationData> | undefined>;
    deleteGlobalApplicationCommand(commandId: Snowflake): Promise<void>;
    bulkOverwriteGlobalApplicationCommands(data: CreateApplicationCommandPayload[]): Promise<Camelize<RawApplicationData>[]>;
    getGuildApplicationCommands(guildId: Snowflake, withLocalization?: boolean): Promise<Camelize<RawApplicationData>[]>;
    createGuildApplicationCommand(guildId: Snowflake, data: CreateApplicationCommandPayload): Promise<Camelize<RawApplicationData> | undefined>;
    getGuildApplicationCommand(guildId: Snowflake, commandId: Snowflake): Promise<Camelize<RawApplicationData> | undefined>;
    editGuildApplicationCommand(guildId: Snowflake, commandId: Snowflake, data: Omit<CreateApplicationCommandPayload, "type">): Promise<Camelize<RawApplicationData> | undefined>;
    deleteGuildApplicationCommand(guildId: Snowflake, commandId: Snowflake): Promise<void>;
    bulkOverwriteGuildApplicationCommands(guildId: Snowflake, data: CreateApplicationCommandPayload[]): Promise<Camelize<RawApplicationData>[]>;
    getGuildApplicationCommandPermissions(guildId: Snowflake): Promise<Camelize<RawGuildApplicationCommandPermissions>[]>;
    getApplicationCommandPermissions(guildId: Snowflake, commandId: Snowflake): Promise<Camelize<RawGuildApplicationCommandPermissions>>;
}
//# sourceMappingURL=index.d.ts.map