export declare enum GatewayOpCodes {
    Dispatch = 0,
    Heartbeat = 1,
    Identify = 2,
    PresenceUpdate = 3,
    VoiceStateUpdate = 4,
    Resume = 5,
    Reconnect = 7,
    RequestGuildMembers = 8,
    InvalidSession = 9,
    Hello = 10,
    HeartbeatAck = 11
}
export declare enum GatewayEventNames {
    Hello = "HELLO",
    Ready = "READY",
    Resumed = "RESUMED",
    Reconnect = "RECONNECT",
    InvalidSession = "INVALID_SESSION",
    ChannelCreate = "CHANNEL_CREATE",
    ChannelUpdate = "CHANNEL_UPDATE",
    ChannelDelete = "CHANNEL_DELETE",
    ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
    ThreadCreate = "THREAD_CREATE",
    ThreadUpdate = "THREAD_UPDATE",
    ThreadDelete = "THREAD_DELETE",
    ThreadListSync = "THREAD_LIST_SYNC",
    ThreadMemberUpdate = "THREAD_MEMBER_UPDATE",
    ThreadMembersUpdate = "THREAD_MEMBERS_UPDATE",
    GuildCreate = "GUILD_CREATE",
    GuildUpdate = "GUILD_UPDATE",
    GuildDelete = "GUILD_DELETE",
    GuildBanAdd = "GUILD_BAN_ADD",
    GuildBanRemove = "GUILD_BAN_REMOVE",
    GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
    GuildIntegrationsUpdate = "GUILD_INTEGRATIONS_UPDATE",
    GuildMemberAdd = "GUILD_MEMBER_ADD",
    GuildMemberRemove = "GUILD_MEMBER_REMOVE",
    GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
    GuildMembersChunk = "GUILD_MEMBERS_CHUNK",
    GuildRoleCreate = "GUILD_ROLE_CREATE",
    GuildRoleUpdate = "GUILD_ROLE_UPDATE",
    GuildRoleDelete = "GUILD_ROLE_DELETE",
    GuildScheduledEventCreate = "GUILD_SCHEDULED_EVENT_CREATE",
    GuildScheduledEventUpdate = "GUILD_SCHEDULED_EVENT_UPDATE",
    GuildScheduledEventDelete = "GUILD_SCHEDULED_EVENT_DELETE",
    GuildScheduledEventUserAdd = "GUILD_SCHEDULED_EVENT_USER_ADD",
    GuildScheduledEventUserRemove = "GUILD_SCHEDULED_EVENT_USER_REMOVE",
    IntergrationCreate = "INTEGRATION_CREATE",
    IntergrationUpdate = "INTEGRATION_UPDATE",
    IntergrationDelete = "INTEGRATION_DELETE",
    InteractionCreate = "INTERACTION_CREATE",
    InviteCreate = "INVITE_CREATE",
    InviteDelete = "INVITE_DELETE",
    MessageCreate = "MESSAGE_CREATE",
    MessageUpdate = "MESSAGE_UPDATE",
    MessageDelete = "MESSAGE_DELETE",
    MessageDeleteBulk = "MESSAGE_DELETE_BULK",
    MessageReactionAdd = "MESSAGE_REACTION_ADD",
    MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
    MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
    MessageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",
    PresenceUpdate = "PRESENCE_UPDATE",
    StageInstanceCreate = "STAGE_INSTANCE_CREATE",
    StageInstanceUpdate = "STAGE_INSTANCE_UPDATE",
    StageInstanceDelete = "STAGE_INSTANCE_DELETE",
    TypingStart = "TYPING_START",
    UserUpdate = "USER_UPDATE",
    VoiceStateUpdate = "VOICE_STATE_UPDATE",
    VoiceServerUpdate = "VOICE_SERVER_UPDATE",
    WebhooksUpdate = "WEBHOOKS_UPDATE",
    Debug = "DEBUG"
}
export declare enum Status {
    Online = "online",
    Dnd = "dnd",
    Idle = "idle",
    Invisible = "invisible",
    Offline = "offline"
}
export declare enum Locales {
    Indonesian = "id",
    Danish = "da",
    German = "de",
    EnglishUK = "en-GB",
    EnglishUS = "en-US",
    Spanish = "es-ES",
    French = "fr",
    Croatian = "hr",
    Italian = "it",
    Lithuanian = "lt",
    Hungarian = "hu",
    Dutch = "nl",
    Norwegian = "no",
    Polish = "pl",
    PortugueseBrazil = "pt-BR",
    Romanian = "ro",
    Finnish = "fi",
    Swedish = "sv-SE",
    Vietnamese = "vi",
    Turkish = "tr",
    Czech = "cs",
    Greek = "el",
    Bulgarian = "bg",
    Russian = "ru",
    Ukrainian = "uk",
    Hindi = "hi",
    Thai = "th",
    ChineseChina = "zh-CN",
    Japanese = "ja",
    ChineseTaiwan = "zh-TW",
    Korean = "ko"
}
export declare enum PremiumTypes {
    None = 0,
    NitroClassic = 1,
    Nitro = 2,
    NitroBasic = 3
}
export declare enum InteractionTypes {
    Ping = 1,
    ApplicationCommand = 2,
    MessageComponent = 3,
    ApplicationCommandAutocomplete = 4,
    ModalSubmit = 5
}
export declare enum ChannelTypes {
    GuildText = 0,
    Dm = 1,
    GuildVoice = 2,
    GroupDm = 3,
    GuildCategory = 4,
    GuildAnnoucement = 5,
    AnnoucementThread = 10,
    PublicThread = 11,
    PrivateThread = 12,
    GuildStageVoice = 13,
    GuildDirectory = 14,
    GuildForum = 15
}
export declare enum ButtonStyles {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5
}
export declare enum TextInputStyles {
    Short = 1,
    Paragraph = 2
}
export declare enum ApplicationRoleConnectionMetadataType {
    IntegerLessThanOrEqual = 1,
    IntegerGreaterThanOrEqual = 2,
    IntegerEqual = 3,
    IntegerNotEqual = 4,
    DateTimeLessThanOrEqual = 5,
    DateTimeGreaterThanOrEqual = 6,
    BooleanEqual = 7,
    BooleanNotEqual = 8
}
export declare enum KeywordPresetTypes {
    Profanity = 1,
    SexualContent = 2,
    Slurs = 3
}
export declare enum ActionTypes {
    BlockMessage = 1,
    SendAlertMessage = 2,
    Timeout = 3
}
export declare enum AllowedMentionTypes {
    Role = "roles",
    User = "users",
    Everyone = "everyone"
}
export declare enum MessageFlags {
    Crossposted = 1,
    IsCrosspost = 2,
    SuppressEmbeds = 4,
    SourceMessageDeleted = 8,
    Urgent = 16,
    HasThread = 32,
    Ephemeral = 64,
    Loading = 128,
    FailedToMentionSomeRolesInThread = 256,
    SuppressNotifications = 4096
}
export declare enum Intents {
    Guilds = 1,
    GuildMembers = 2,
    GuildModeration = 4,
    GuildEmojisAndStickers = 8,
    GuildIntegrations = 16,
    GuildWebhooks = 32,
    GuildInvites = 64,
    GuildVoiceStates = 128,
    GuildPresences = 256,
    GuildMessages = 512,
    GuildMessageReactions = 1024,
    GuildMessageTyping = 2048,
    DirectMessages = 4096,
    DirectMessageReactions = 8192,
    DirectMessageTyping = 16384,
    MessageContent = 32768,
    GuildScheduledEvents = 65536,
    AutoModerationConfiguration = 131072,
    AutoModerationExecution = 262144
}
export declare enum OverwriteType {
    Role = 0,
    Member = 1
}
export declare enum VerificationLevel {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    VeryHigh = 4
}
export declare enum DefaultMessageNotifications {
    AllMessages = 0,
    OnlyMentions = 1
}
export declare enum ExplicitContentFilterLevel {
    Disabled = 0,
    MembersWithoutRoles = 1,
    AllMembers = 2
}
export declare enum MFALevel {
    None = 0,
    Elevated = 1
}
export declare enum PremiumTier {
    None = 0,
    Tier1 = 1,
    Tier2 = 2,
    Tier3 = 3
}
export declare enum GuildNSFWLevel {
    Default = 0,
    Explicit = 1,
    Safe = 2,
    AgeRestricted = 3
}
export declare enum SystemChannelFlags {
    SuppressJoinNotifications = 1,
    SuppressPremiumSubscriptions = 2,
    SuppressGuildReminderNotifications = 4,
    SuppressJoinNotificationReplies = 8,
    SuppressRoleSubscriptionPurchaseNotifications = 16,
    SuppressRoleSubscriptionPurchaseNotificationsReplies = 32
}
export declare enum GuildFeatures {
    AnimatedBanner = "ANIMATED_BANNER",
    AnimatedIcon = "ANIMATED_ICON",
    ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
    AutoModeration = "AUTO_MODERATION",
    Banner = "BANNER",
    Community = "COMMUNITY",
    CreatorMonetizableProvisonal = "CREATOR_MONETIZABLE_PROVISIONAL",
    CreatorStorePage = "CREATOR_STORE_PAGE",
    DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
    Discoverable = "DISCOVERABLE",
    Featurable = "FEATURABLE",
    InvitesDisabled = "INVITES_DISABLED",
    InviteSplash = "INVITE_SPLASH",
    MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
    MoreStickers = "MORE_STICKERS",
    News = "NEWS",
    Partnered = "PARTNERED",
    PreviewEnabled = "PREVIEW_ENABLED",
    RoleIcons = "ROLE_ICONS",
    RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
    TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
    VanityUrl = "VANITY_URL",
    VipRegions = "VIP_REGIONS",
    Verified = "VERIFIED",
    WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED"
}
export declare enum InviteTargetTypes {
    Stream = 1,
    EmbeddedApplication = 2
}
export declare enum GuildScheduledEventPrivacyLevel {
    Public = 1,
    GuildOnly = 2
}
export declare enum GuildScheduledEventStatus {
    Scheduled = 1,
    Active = 2,
    Completed = 3,
    Cancelled = 4
}
export declare enum GuildScheduledEventEntityType {
    StageInstance = 1,
    Voice = 2,
    External = 3
}
export declare enum ThreadAutoArchiveDuration {
    OneHour = 60,
    SixHours = 360,
    OneDay = 1440,
    ThreeDays = 4320,
    OneWeek = 10080
}
export declare enum StickerFormatType {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3,
    GIF = 4
}
export declare enum ApplicationCommandTypes {
    ChatInput = 1,
    User = 2,
    Message = 3
}
export declare enum ApplicationCommandOptionTypes {
    SubCommand = 1,
    SubCommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8,
    Mentionable = 9,
    Number = 10
}
export declare enum InteractionResponseTypes {
    Pong = 1,
    ChannelMessageWithSource = 4,
    DeferredChannelMessageWithSource = 5,
    DeferredUpdateMessage = 6,
    UpdateMessage = 7,
    ApplicationCommandAutocompleteResult = 8,
    Modal = 9
}
export declare enum ComponentTypes {
    ActionRow = 1,
    Button = 2,
    StringSelect = 3,
    TextSelect = 4,
    UserSelect = 5,
    RoleSelect = 6,
    MentionableSelect = 7,
    ChannelSelect = 8
}
//# sourceMappingURL=enums.d.ts.map