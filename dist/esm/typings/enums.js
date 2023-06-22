export var GatewayOpCodes;
(function (GatewayOpCodes) {
    GatewayOpCodes[GatewayOpCodes["Dispatch"] = 0] = "Dispatch";
    GatewayOpCodes[GatewayOpCodes["Heartbeat"] = 1] = "Heartbeat";
    GatewayOpCodes[GatewayOpCodes["Identify"] = 2] = "Identify";
    GatewayOpCodes[GatewayOpCodes["PresenceUpdate"] = 3] = "PresenceUpdate";
    GatewayOpCodes[GatewayOpCodes["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
    GatewayOpCodes[GatewayOpCodes["Resume"] = 5] = "Resume";
    GatewayOpCodes[GatewayOpCodes["Reconnect"] = 7] = "Reconnect";
    GatewayOpCodes[GatewayOpCodes["RequestGuildMembers"] = 8] = "RequestGuildMembers";
    GatewayOpCodes[GatewayOpCodes["InvalidSession"] = 9] = "InvalidSession";
    GatewayOpCodes[GatewayOpCodes["Hello"] = 10] = "Hello";
    GatewayOpCodes[GatewayOpCodes["HeartbeatAck"] = 11] = "HeartbeatAck";
})(GatewayOpCodes || (GatewayOpCodes = {}));
export var GatewayEventNames;
(function (GatewayEventNames) {
    GatewayEventNames["Hello"] = "HELLO";
    GatewayEventNames["Ready"] = "READY";
    GatewayEventNames["Resumed"] = "RESUMED";
    GatewayEventNames["Reconnect"] = "RECONNECT";
    GatewayEventNames["InvalidSession"] = "INVALID_SESSION";
    GatewayEventNames["ChannelCreate"] = "CHANNEL_CREATE";
    GatewayEventNames["ChannelUpdate"] = "CHANNEL_UPDATE";
    GatewayEventNames["ChannelDelete"] = "CHANNEL_DELETE";
    GatewayEventNames["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
    GatewayEventNames["ThreadCreate"] = "THREAD_CREATE";
    GatewayEventNames["ThreadUpdate"] = "THREAD_UPDATE";
    GatewayEventNames["ThreadDelete"] = "THREAD_DELETE";
    GatewayEventNames["ThreadListSync"] = "THREAD_LIST_SYNC";
    GatewayEventNames["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
    GatewayEventNames["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
    GatewayEventNames["GuildCreate"] = "GUILD_CREATE";
    GatewayEventNames["GuildUpdate"] = "GUILD_UPDATE";
    GatewayEventNames["GuildDelete"] = "GUILD_DELETE";
    GatewayEventNames["GuildBanAdd"] = "GUILD_BAN_ADD";
    GatewayEventNames["GuildBanRemove"] = "GUILD_BAN_REMOVE";
    GatewayEventNames["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
    GatewayEventNames["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
    GatewayEventNames["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
    GatewayEventNames["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
    GatewayEventNames["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
    GatewayEventNames["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
    GatewayEventNames["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
    GatewayEventNames["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
    GatewayEventNames["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
    GatewayEventNames["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
    GatewayEventNames["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
    GatewayEventNames["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
    GatewayEventNames["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
    GatewayEventNames["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
    GatewayEventNames["IntergrationCreate"] = "INTEGRATION_CREATE";
    GatewayEventNames["IntergrationUpdate"] = "INTEGRATION_UPDATE";
    GatewayEventNames["IntergrationDelete"] = "INTEGRATION_DELETE";
    GatewayEventNames["InteractionCreate"] = "INTERACTION_CREATE";
    GatewayEventNames["InviteCreate"] = "INVITE_CREATE";
    GatewayEventNames["InviteDelete"] = "INVITE_DELETE";
    GatewayEventNames["MessageCreate"] = "MESSAGE_CREATE";
    GatewayEventNames["MessageUpdate"] = "MESSAGE_UPDATE";
    GatewayEventNames["MessageDelete"] = "MESSAGE_DELETE";
    GatewayEventNames["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
    GatewayEventNames["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
    GatewayEventNames["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
    GatewayEventNames["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
    GatewayEventNames["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
    GatewayEventNames["PresenceUpdate"] = "PRESENCE_UPDATE";
    GatewayEventNames["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
    GatewayEventNames["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
    GatewayEventNames["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
    GatewayEventNames["TypingStart"] = "TYPING_START";
    GatewayEventNames["UserUpdate"] = "USER_UPDATE";
    GatewayEventNames["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
    GatewayEventNames["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
    GatewayEventNames["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
    GatewayEventNames["Debug"] = "DEBUG";
})(GatewayEventNames || (GatewayEventNames = {}));
export var Status;
(function (Status) {
    Status["Online"] = "online";
    Status["Dnd"] = "dnd";
    Status["Idle"] = "idle";
    Status["Invisible"] = "invisible";
    Status["Offline"] = "offline";
})(Status || (Status = {}));
export var Locales;
(function (Locales) {
    Locales["Indonesian"] = "id";
    Locales["Danish"] = "da";
    Locales["German"] = "de";
    Locales["EnglishUK"] = "en-GB";
    Locales["EnglishUS"] = "en-US";
    Locales["Spanish"] = "es-ES";
    Locales["French"] = "fr";
    Locales["Croatian"] = "hr";
    Locales["Italian"] = "it";
    Locales["Lithuanian"] = "lt";
    Locales["Hungarian"] = "hu";
    Locales["Dutch"] = "nl";
    Locales["Norwegian"] = "no";
    Locales["Polish"] = "pl";
    Locales["PortugueseBrazil"] = "pt-BR";
    Locales["Romanian"] = "ro";
    Locales["Finnish"] = "fi";
    Locales["Swedish"] = "sv-SE";
    Locales["Vietnamese"] = "vi";
    Locales["Turkish"] = "tr";
    Locales["Czech"] = "cs";
    Locales["Greek"] = "el";
    Locales["Bulgarian"] = "bg";
    Locales["Russian"] = "ru";
    Locales["Ukrainian"] = "uk";
    Locales["Hindi"] = "hi";
    Locales["Thai"] = "th";
    Locales["ChineseChina"] = "zh-CN";
    Locales["Japanese"] = "ja";
    Locales["ChineseTaiwan"] = "zh-TW";
    Locales["Korean"] = "ko";
})(Locales || (Locales = {}));
export var PremiumTypes;
(function (PremiumTypes) {
    PremiumTypes[PremiumTypes["None"] = 0] = "None";
    PremiumTypes[PremiumTypes["NitroClassic"] = 1] = "NitroClassic";
    PremiumTypes[PremiumTypes["Nitro"] = 2] = "Nitro";
    PremiumTypes[PremiumTypes["NitroBasic"] = 3] = "NitroBasic";
})(PremiumTypes || (PremiumTypes = {}));
export var InteractionTypes;
(function (InteractionTypes) {
    InteractionTypes[InteractionTypes["Ping"] = 1] = "Ping";
    InteractionTypes[InteractionTypes["ApplicationCommand"] = 2] = "ApplicationCommand";
    InteractionTypes[InteractionTypes["MessageComponent"] = 3] = "MessageComponent";
    InteractionTypes[InteractionTypes["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
    InteractionTypes[InteractionTypes["ModalSubmit"] = 5] = "ModalSubmit";
})(InteractionTypes || (InteractionTypes = {}));
export var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GuildText"] = 0] = "GuildText";
    ChannelTypes[ChannelTypes["Dm"] = 1] = "Dm";
    ChannelTypes[ChannelTypes["GuildVoice"] = 2] = "GuildVoice";
    ChannelTypes[ChannelTypes["GroupDm"] = 3] = "GroupDm";
    ChannelTypes[ChannelTypes["GuildCategory"] = 4] = "GuildCategory";
    ChannelTypes[ChannelTypes["GuildAnnoucement"] = 5] = "GuildAnnoucement";
    ChannelTypes[ChannelTypes["AnnoucementThread"] = 10] = "AnnoucementThread";
    ChannelTypes[ChannelTypes["PublicThread"] = 11] = "PublicThread";
    ChannelTypes[ChannelTypes["PrivateThread"] = 12] = "PrivateThread";
    ChannelTypes[ChannelTypes["GuildStageVoice"] = 13] = "GuildStageVoice";
    ChannelTypes[ChannelTypes["GuildDirectory"] = 14] = "GuildDirectory";
    ChannelTypes[ChannelTypes["GuildForum"] = 15] = "GuildForum";
})(ChannelTypes || (ChannelTypes = {}));
export var ButtonStyles;
(function (ButtonStyles) {
    ButtonStyles[ButtonStyles["Primary"] = 1] = "Primary";
    ButtonStyles[ButtonStyles["Secondary"] = 2] = "Secondary";
    ButtonStyles[ButtonStyles["Success"] = 3] = "Success";
    ButtonStyles[ButtonStyles["Danger"] = 4] = "Danger";
    ButtonStyles[ButtonStyles["Link"] = 5] = "Link";
})(ButtonStyles || (ButtonStyles = {}));
export var TextInputStyles;
(function (TextInputStyles) {
    TextInputStyles[TextInputStyles["Short"] = 1] = "Short";
    TextInputStyles[TextInputStyles["Paragraph"] = 2] = "Paragraph";
})(TextInputStyles || (TextInputStyles = {}));
export var ApplicationRoleConnectionMetadataType;
(function (ApplicationRoleConnectionMetadataType) {
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerEqual"] = 3] = "IntegerEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerNotEqual"] = 4] = "IntegerNotEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DateTimeLessThanOrEqual"] = 5] = "DateTimeLessThanOrEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DateTimeGreaterThanOrEqual"] = 6] = "DateTimeGreaterThanOrEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanEqual"] = 7] = "BooleanEqual";
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanNotEqual"] = 8] = "BooleanNotEqual";
})(ApplicationRoleConnectionMetadataType || (ApplicationRoleConnectionMetadataType = {}));
export var KeywordPresetTypes;
(function (KeywordPresetTypes) {
    KeywordPresetTypes[KeywordPresetTypes["Profanity"] = 1] = "Profanity";
    KeywordPresetTypes[KeywordPresetTypes["SexualContent"] = 2] = "SexualContent";
    KeywordPresetTypes[KeywordPresetTypes["Slurs"] = 3] = "Slurs";
})(KeywordPresetTypes || (KeywordPresetTypes = {}));
export var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["BlockMessage"] = 1] = "BlockMessage";
    ActionTypes[ActionTypes["SendAlertMessage"] = 2] = "SendAlertMessage";
    ActionTypes[ActionTypes["Timeout"] = 3] = "Timeout";
})(ActionTypes || (ActionTypes = {}));
export var AllowedMentionTypes;
(function (AllowedMentionTypes) {
    AllowedMentionTypes["Role"] = "roles";
    AllowedMentionTypes["User"] = "users";
    AllowedMentionTypes["Everyone"] = "everyone";
})(AllowedMentionTypes || (AllowedMentionTypes = {}));
export var MessageFlags;
(function (MessageFlags) {
    MessageFlags[MessageFlags["Crossposted"] = 1] = "Crossposted";
    MessageFlags[MessageFlags["IsCrosspost"] = 2] = "IsCrosspost";
    MessageFlags[MessageFlags["SuppressEmbeds"] = 4] = "SuppressEmbeds";
    MessageFlags[MessageFlags["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
    MessageFlags[MessageFlags["Urgent"] = 16] = "Urgent";
    MessageFlags[MessageFlags["HasThread"] = 32] = "HasThread";
    MessageFlags[MessageFlags["Ephemeral"] = 64] = "Ephemeral";
    MessageFlags[MessageFlags["Loading"] = 128] = "Loading";
    MessageFlags[MessageFlags["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
    MessageFlags[MessageFlags["SuppressNotifications"] = 4096] = "SuppressNotifications";
})(MessageFlags || (MessageFlags = {}));
export var Intents;
(function (Intents) {
    Intents[Intents["Guilds"] = 1] = "Guilds";
    Intents[Intents["GuildMembers"] = 2] = "GuildMembers";
    Intents[Intents["GuildModeration"] = 4] = "GuildModeration";
    Intents[Intents["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
    Intents[Intents["GuildIntegrations"] = 16] = "GuildIntegrations";
    Intents[Intents["GuildWebhooks"] = 32] = "GuildWebhooks";
    Intents[Intents["GuildInvites"] = 64] = "GuildInvites";
    Intents[Intents["GuildVoiceStates"] = 128] = "GuildVoiceStates";
    Intents[Intents["GuildPresences"] = 256] = "GuildPresences";
    Intents[Intents["GuildMessages"] = 512] = "GuildMessages";
    Intents[Intents["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
    Intents[Intents["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
    Intents[Intents["DirectMessages"] = 4096] = "DirectMessages";
    Intents[Intents["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
    Intents[Intents["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
    Intents[Intents["MessageContent"] = 32768] = "MessageContent";
    Intents[Intents["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
    Intents[Intents["AutoModerationConfiguration"] = 131072] = "AutoModerationConfiguration";
    Intents[Intents["AutoModerationExecution"] = 262144] = "AutoModerationExecution";
})(Intents || (Intents = {}));
export var OverwriteType;
(function (OverwriteType) {
    OverwriteType[OverwriteType["Role"] = 0] = "Role";
    OverwriteType[OverwriteType["Member"] = 1] = "Member";
})(OverwriteType || (OverwriteType = {}));
export var VerificationLevel;
(function (VerificationLevel) {
    VerificationLevel[VerificationLevel["None"] = 0] = "None";
    VerificationLevel[VerificationLevel["Low"] = 1] = "Low";
    VerificationLevel[VerificationLevel["Medium"] = 2] = "Medium";
    VerificationLevel[VerificationLevel["High"] = 3] = "High";
    VerificationLevel[VerificationLevel["VeryHigh"] = 4] = "VeryHigh";
})(VerificationLevel || (VerificationLevel = {}));
export var DefaultMessageNotifications;
(function (DefaultMessageNotifications) {
    DefaultMessageNotifications[DefaultMessageNotifications["AllMessages"] = 0] = "AllMessages";
    DefaultMessageNotifications[DefaultMessageNotifications["OnlyMentions"] = 1] = "OnlyMentions";
})(DefaultMessageNotifications || (DefaultMessageNotifications = {}));
export var ExplicitContentFilterLevel;
(function (ExplicitContentFilterLevel) {
    ExplicitContentFilterLevel[ExplicitContentFilterLevel["Disabled"] = 0] = "Disabled";
    ExplicitContentFilterLevel[ExplicitContentFilterLevel["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
    ExplicitContentFilterLevel[ExplicitContentFilterLevel["AllMembers"] = 2] = "AllMembers";
})(ExplicitContentFilterLevel || (ExplicitContentFilterLevel = {}));
export var MFALevel;
(function (MFALevel) {
    MFALevel[MFALevel["None"] = 0] = "None";
    MFALevel[MFALevel["Elevated"] = 1] = "Elevated";
})(MFALevel || (MFALevel = {}));
export var PremiumTier;
(function (PremiumTier) {
    PremiumTier[PremiumTier["None"] = 0] = "None";
    PremiumTier[PremiumTier["Tier1"] = 1] = "Tier1";
    PremiumTier[PremiumTier["Tier2"] = 2] = "Tier2";
    PremiumTier[PremiumTier["Tier3"] = 3] = "Tier3";
})(PremiumTier || (PremiumTier = {}));
export var GuildNSFWLevel;
(function (GuildNSFWLevel) {
    GuildNSFWLevel[GuildNSFWLevel["Default"] = 0] = "Default";
    GuildNSFWLevel[GuildNSFWLevel["Explicit"] = 1] = "Explicit";
    GuildNSFWLevel[GuildNSFWLevel["Safe"] = 2] = "Safe";
    GuildNSFWLevel[GuildNSFWLevel["AgeRestricted"] = 3] = "AgeRestricted";
})(GuildNSFWLevel || (GuildNSFWLevel = {}));
export var SystemChannelFlags;
(function (SystemChannelFlags) {
    SystemChannelFlags[SystemChannelFlags["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
    SystemChannelFlags[SystemChannelFlags["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
    SystemChannelFlags[SystemChannelFlags["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
    SystemChannelFlags[SystemChannelFlags["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
    SystemChannelFlags[SystemChannelFlags["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
    SystemChannelFlags[SystemChannelFlags["SuppressRoleSubscriptionPurchaseNotificationsReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationsReplies";
})(SystemChannelFlags || (SystemChannelFlags = {}));
export var GuildFeatures;
(function (GuildFeatures) {
    GuildFeatures["AnimatedBanner"] = "ANIMATED_BANNER";
    GuildFeatures["AnimatedIcon"] = "ANIMATED_ICON";
    GuildFeatures["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
    GuildFeatures["AutoModeration"] = "AUTO_MODERATION";
    GuildFeatures["Banner"] = "BANNER";
    GuildFeatures["Community"] = "COMMUNITY";
    GuildFeatures["CreatorMonetizableProvisonal"] = "CREATOR_MONETIZABLE_PROVISIONAL";
    GuildFeatures["CreatorStorePage"] = "CREATOR_STORE_PAGE";
    GuildFeatures["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
    GuildFeatures["Discoverable"] = "DISCOVERABLE";
    GuildFeatures["Featurable"] = "FEATURABLE";
    GuildFeatures["InvitesDisabled"] = "INVITES_DISABLED";
    GuildFeatures["InviteSplash"] = "INVITE_SPLASH";
    GuildFeatures["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    GuildFeatures["MoreStickers"] = "MORE_STICKERS";
    GuildFeatures["News"] = "NEWS";
    GuildFeatures["Partnered"] = "PARTNERED";
    GuildFeatures["PreviewEnabled"] = "PREVIEW_ENABLED";
    GuildFeatures["RoleIcons"] = "ROLE_ICONS";
    GuildFeatures["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
    GuildFeatures["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
    GuildFeatures["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
    GuildFeatures["VanityUrl"] = "VANITY_URL";
    GuildFeatures["VipRegions"] = "VIP_REGIONS";
    GuildFeatures["Verified"] = "VERIFIED";
    GuildFeatures["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
})(GuildFeatures || (GuildFeatures = {}));
export var InviteTargetTypes;
(function (InviteTargetTypes) {
    InviteTargetTypes[InviteTargetTypes["Stream"] = 1] = "Stream";
    InviteTargetTypes[InviteTargetTypes["EmbeddedApplication"] = 2] = "EmbeddedApplication";
})(InviteTargetTypes || (InviteTargetTypes = {}));
export var GuildScheduledEventPrivacyLevel;
(function (GuildScheduledEventPrivacyLevel) {
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["Public"] = 1] = "Public";
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(GuildScheduledEventPrivacyLevel || (GuildScheduledEventPrivacyLevel = {}));
export var GuildScheduledEventStatus;
(function (GuildScheduledEventStatus) {
    GuildScheduledEventStatus[GuildScheduledEventStatus["Scheduled"] = 1] = "Scheduled";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Active"] = 2] = "Active";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Completed"] = 3] = "Completed";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Cancelled"] = 4] = "Cancelled";
})(GuildScheduledEventStatus || (GuildScheduledEventStatus = {}));
export var GuildScheduledEventEntityType;
(function (GuildScheduledEventEntityType) {
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["StageInstance"] = 1] = "StageInstance";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["Voice"] = 2] = "Voice";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["External"] = 3] = "External";
})(GuildScheduledEventEntityType || (GuildScheduledEventEntityType = {}));
export var ThreadAutoArchiveDuration;
(function (ThreadAutoArchiveDuration) {
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneHour"] = 60] = "OneHour";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["SixHours"] = 360] = "SixHours";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneDay"] = 1440] = "OneDay";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["ThreeDays"] = 4320] = "ThreeDays";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneWeek"] = 10080] = "OneWeek";
})(ThreadAutoArchiveDuration || (ThreadAutoArchiveDuration = {}));
export var StickerFormatType;
(function (StickerFormatType) {
    StickerFormatType[StickerFormatType["PNG"] = 1] = "PNG";
    StickerFormatType[StickerFormatType["APNG"] = 2] = "APNG";
    StickerFormatType[StickerFormatType["LOTTIE"] = 3] = "LOTTIE";
    StickerFormatType[StickerFormatType["GIF"] = 4] = "GIF";
})(StickerFormatType || (StickerFormatType = {}));
export var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    ApplicationCommandTypes[ApplicationCommandTypes["ChatInput"] = 1] = "ChatInput";
    ApplicationCommandTypes[ApplicationCommandTypes["User"] = 2] = "User";
    ApplicationCommandTypes[ApplicationCommandTypes["Message"] = 3] = "Message";
})(ApplicationCommandTypes || (ApplicationCommandTypes = {}));
export var ApplicationCommandOptionTypes;
(function (ApplicationCommandOptionTypes) {
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SubCommand"] = 1] = "SubCommand";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SubCommandGroup"] = 2] = "SubCommandGroup";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["String"] = 3] = "String";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["Integer"] = 4] = "Integer";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["Boolean"] = 5] = "Boolean";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["User"] = 6] = "User";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["Channel"] = 7] = "Channel";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["Role"] = 8] = "Role";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["Mentionable"] = 9] = "Mentionable";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["Number"] = 10] = "Number";
})(ApplicationCommandOptionTypes || (ApplicationCommandOptionTypes = {}));
export var InteractionResponseTypes;
(function (InteractionResponseTypes) {
    InteractionResponseTypes[InteractionResponseTypes["Pong"] = 1] = "Pong";
    InteractionResponseTypes[InteractionResponseTypes["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
    InteractionResponseTypes[InteractionResponseTypes["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
    InteractionResponseTypes[InteractionResponseTypes["DeferredUpdateMessage"] = 6] = "DeferredUpdateMessage";
    InteractionResponseTypes[InteractionResponseTypes["UpdateMessage"] = 7] = "UpdateMessage";
    InteractionResponseTypes[InteractionResponseTypes["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
    InteractionResponseTypes[InteractionResponseTypes["Modal"] = 9] = "Modal";
})(InteractionResponseTypes || (InteractionResponseTypes = {}));
export var ComponentTypes;
(function (ComponentTypes) {
    ComponentTypes[ComponentTypes["ActionRow"] = 1] = "ActionRow";
    ComponentTypes[ComponentTypes["Button"] = 2] = "Button";
    ComponentTypes[ComponentTypes["StringSelect"] = 3] = "StringSelect";
    ComponentTypes[ComponentTypes["TextSelect"] = 4] = "TextSelect";
    ComponentTypes[ComponentTypes["UserSelect"] = 5] = "UserSelect";
    ComponentTypes[ComponentTypes["RoleSelect"] = 6] = "RoleSelect";
    ComponentTypes[ComponentTypes["MentionableSelect"] = 7] = "MentionableSelect";
    ComponentTypes[ComponentTypes["ChannelSelect"] = 8] = "ChannelSelect";
})(ComponentTypes || (ComponentTypes = {}));
export const Permissions = {
    // in bigints
    CreateInstantInvite: 1n << 0n,
    KickMembers: 1n << 1n,
    BanMembers: 1n << 2n,
    Administrator: 1n << 3n,
    ManageChannels: 1n << 4n,
    ManageGuild: 1n << 5n,
    AddReactions: 1n << 6n,
    ViewAuditLog: 1n << 7n,
    PrioritySpeaker: 1n << 8n,
    Stream: 1n << 9n,
    ViewChannel: 1n << 10n,
    SendMessages: 1n << 11n,
    SendTTSMessages: 1n << 12n,
    ManageMessages: 1n << 13n,
    EmbedLinks: 1n << 14n,
    AttachFiles: 1n << 15n,
    ReadMessageHistory: 1n << 16n,
    MentionEveryone: 1n << 17n,
    UseExternalEmojis: 1n << 18n,
    ViewGuildInsights: 1n << 19n,
    Connect: 1n << 20n,
    Speak: 1n << 21n,
    MuteMembers: 1n << 22n,
    DeafenMembers: 1n << 23n,
    MoveMembers: 1n << 24n,
    UseVAD: 1n << 25n,
    ChangeNickname: 1n << 26n,
    ManageNicknames: 1n << 27n,
    ManageRoles: 1n << 28n,
    ManageWebhooks: 1n << 29n,
    ManageGuildExpressions: 1n << 30n,
    UseApplicationCommands: 1n << 31n,
    RequestToSpeak: 1n << 32n,
    ManageEvents: 1n << 33n,
    ManageThreads: 1n << 34n,
    CreatePublicThreads: 1n << 35n,
    CreatePrivateThreads: 1n << 36n,
    UseExternalStickers: 1n << 37n,
    SendMessagesInThreads: 1n << 38n,
    UseEmbeddedActivities: 1n << 39n,
    ModerateMembers: 1n << 40n,
    ViewCreatorMonetizationAnalytics: 1n << 41n,
    UseSoundBoard: 1n << 42n,
    UseExternalSounds: 1n << 45n,
    SendVoiceMessages: 1n << 46n,
};
//# sourceMappingURL=enums.js.map