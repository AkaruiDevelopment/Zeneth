import { Camelize, integer, Snowflake } from '../typings/types.js';
import { DefaultMessageNotifications, ExplicitContentFilterLevel, GuildFeatures, GuildNSFWLevel, MFALevel, PremiumTier, VerificationLevel } from '../typings/enums.js';
import Role from './Role.js';
import Emoji from './Emoji.js';
import { GuildScheduledEvent, Presence, RawGuildData, RawWelcomeScreenData, StageInstances, VoiceState } from '../typings/interface.js';
import Client from '../client/index.js';
import Sticker from './Sticker.js';
import Collection from '../plugins/cache/Group.js';
import Member from './Member.js';
import Channel from './Channel.js';
export default class Guild {
    #private;
    id: Snowflake;
    name: string;
    icon?: bigint;
    iconHash?: bigint;
    splash?: bigint;
    discoverySlash?: bigint | null;
    owner?: boolean;
    ownerId: Snowflake;
    permissions?: bigint;
    afk: {
        channelId: Snowflake | null;
        timeout: integer;
    };
    widget: {
        enabled?: boolean;
        channelId?: Snowflake | null;
    };
    verificationLevel: VerificationLevel;
    defaultMessageNotifications: DefaultMessageNotifications;
    explicitContentFilter: ExplicitContentFilterLevel;
    roles: Role[];
    emojis: Collection<Snowflake, Emoji>;
    features: GuildFeatures[];
    mfaLevel: MFALevel;
    applicationId: Snowflake | undefined;
    system: {
        channelId: Snowflake | null;
        channelFlags: integer;
    };
    rulesChannelId: Snowflake | null;
    max: {
        presences?: integer;
        members?: integer;
        videoChannelUsers?: integer;
    };
    vanityUrlCode?: string | null;
    description?: string | null;
    banner?: bigint | null;
    premium: {
        tier: PremiumTier;
        subscriptionCount: integer;
        progressBarEnabled: boolean;
    };
    preferredLocale: string;
    publicUpdatesChannelId?: Snowflake | null;
    approx: {
        members?: integer;
        presences?: integer;
    };
    welcomeScreen?: Camelize<RawWelcomeScreenData>;
    NSFWLevel: GuildNSFWLevel;
    stickers?: Collection<Snowflake, Sticker>;
    joinedAt?: Date;
    large?: boolean;
    unavailable?: boolean;
    memberCount?: integer;
    voiceStates: Collection<Snowflake, VoiceState>;
    members: Collection<Snowflake, Member>;
    channels: Collection<Snowflake, Channel>;
    threads: Collection<Snowflake, Channel>;
    presences: Collection<Snowflake, Presence>;
    stageInstances: Collection<Snowflake, StageInstances>;
    guildScheduledEvents: Collection<Snowflake, GuildScheduledEvent>;
    __priority: number;
    constructor(data: RawGuildData, client: Client);
    get parsedSnowflake(): {
        timestamp: number;
        date: Date;
        workerId: bigint;
        processId: bigint;
        increment: bigint;
        binary: string;
    };
    get [Symbol.toStringTag](): bigint;
}
//# sourceMappingURL=Guild.d.ts.map