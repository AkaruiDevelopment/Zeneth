import { Camelize, integer, snowflake, Snowflake } from '../typings/types.js';
import {
  DefaultMessageNotifications,
  ExplicitContentFilterLevel,
  GuildFeatures,
  GuildNSFWLevel,
  MFALevel,
  PremiumTier,
  VerificationLevel,
} from '../typings/enums.js';
import Role from './Role.js';
import Emoji from './Emoji.js';
import {
  GuildScheduledEvent,
  Presence,
  RawGuildData,
  RawWelcomeScreenData,
  StageInstances,
  VoiceState,
} from '../typings/interface.js';
import Client from '../client/index.js';
import Sticker from './Sticker.js';
import {
  ConvertHexToBigInt,
  convertToCamelCase,
  parseSnowflake,
} from '../utils/helpers.js';
import Collection from '../plugins/cache/Group.js';
import Member from './Member.js';
import Channel from './Channel.js';
import User from './User.js';

export default class Guild {
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
  emojis: Emoji[];
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
  stickers?: Sticker[];

  // extra fields

  joinedAt?: Date;
  large?: boolean;
  unavailable?: boolean;
  memberCount?: integer;
  voiceStates: Collection<Snowflake, VoiceState> = new Collection<
    Snowflake,
    VoiceState
  >({
    class: 'VoiceState',
    sweeper: {
      cacheTimeLimit: 86400000,
      timeLimit: 86400000,
      timer: null,
      type: 'priority',
    },
  });
  members: Collection<Snowflake, Member> = new Collection<Snowflake, Member>({
    class: 'Member',
    sweeper: {
      cacheTimeLimit: 86400000,
      timeLimit: 86400000,
      timer: null,
      type: 'priority',
    },
  });
  channels: Collection<Snowflake, Channel> = new Collection<Snowflake, Channel>(
    {
      class: 'Channel',
      sweeper: {
        cacheTimeLimit: 86400000,
        timeLimit: 86400000,
        timer: null,
        type: 'priority',
      },
    },
  );

  threads: Collection<Snowflake, Channel> = new Collection<Snowflake, Channel>({
    class: 'Channel',
    sweeper: {
      cacheTimeLimit: 86400000,
      timeLimit: 86400000,
      timer: null,
      type: 'priority',
    },
  });
  presences: Collection<Snowflake, Presence> = new Collection<
    Snowflake,
    Presence
  >({
    class: 'Presence',
    sweeper: {
      cacheTimeLimit: 86400000,
      timeLimit: 86400000,
      timer: null,
      type: 'priority',
    },
  });
  stageInstances: Collection<Snowflake, StageInstances> = new Collection<
    Snowflake,
    StageInstances
  >({
    class: 'StageInstances',
    sweeper: {
      cacheTimeLimit: 86400000,
      timeLimit: 86400000,
      timer: null,
      type: 'priority',
    },
  });
  guildScheduledEvents: Collection<Snowflake, GuildScheduledEvent> =
    new Collection<Snowflake, GuildScheduledEvent>({
      class: 'GuildScheduledEvent',
      sweeper: {
        cacheTimeLimit: 86400000,
        timeLimit: 86400000,
        timer: null,
        type: 'priority',
      },
    });
  #client: Client;
  __priority: number;
  constructor(data: RawGuildData, client: Client) {
    this.#client = client;
    this.NSFWLevel = data.nsfw_level;
    this.afk = {
      channelId: data.afk_channel_id ? BigInt(data.afk_channel_id) : null,
      timeout: data.afk_timeout,
    };
    this.applicationId = data.application_id
      ? BigInt(data.application_id)
      : undefined;
    this.approx = {
      members: data.approximate_member_count,
      presences: data.approximate_presence_count,
    };
    this.banner = data.banner ? ConvertHexToBigInt(data.banner) : null;
    this.defaultMessageNotifications = data.default_message_notifications;
    this.description = data.description;
    this.discoverySlash = data.discovery_splash
      ? ConvertHexToBigInt(data.discovery_splash)
      : undefined;
    this.emojis = data.emojis.map((x) => new Emoji(x, client, data.id));
    this.explicitContentFilter = data.explicit_content_filter;
    this.features = data.features;
    this.icon = data.icon ? ConvertHexToBigInt(data.icon) : undefined;
    this.iconHash = data.icon_hash
      ? ConvertHexToBigInt(data.icon_hash)
      : undefined;
    this.id = BigInt(data.id);
    this.max = {
      members: data.max_members,
      presences: data.max_presences,
      videoChannelUsers: data.max_video_channel_users,
    };
    this.mfaLevel = data.mfa_level;
    this.name = data.name;
    this.owner = data.owner;
    this.ownerId = BigInt(data.owner_id);
    this.permissions = data.permissions ? BigInt(data.permissions) : undefined;
    this.preferredLocale = data.preferred_locale;
    this.premium = {
      tier: data.premium_tier,
      subscriptionCount: data.premium_subscription_count ?? 0,
      progressBarEnabled: data.premium_progress_bar_enabled ?? false,
    };
    this.publicUpdatesChannelId = data.public_updates_channel_id
      ? BigInt(data.public_updates_channel_id)
      : undefined;
    this.roles = data.roles.map((x) => new Role(x, client));
    this.rulesChannelId = data.rules_channel_id
      ? BigInt(data.rules_channel_id)
      : null;
    this.splash = data.splash ? ConvertHexToBigInt(data.splash) : undefined;
    this.stickers = data.stickers?.map((x) => new Sticker(x, client));
    this.system = {
      channelFlags: data.system_channel_flags,
      channelId: data.system_channel_id ? BigInt(data.system_channel_id) : null,
    };
    this.vanityUrlCode = data.vanity_url_code;
    this.verificationLevel = data.verification_level;
    this.welcomeScreen = data.welcome_screen
      ? <Camelize<RawWelcomeScreenData>>convertToCamelCase(data.welcome_screen)
      : undefined;
    this.widget = {
      channelId: data.widget_channel_id
        ? BigInt(data.widget_channel_id)
        : undefined,
      enabled: data.widget_enabled ?? false,
    };
    this.__priority = 0;
    this.joinedAt = data.joined_at ? new Date(data.joined_at) : undefined;
    this.large = data.large;
    this.memberCount = data.member_count;
    data.voice_states?.forEach((x) => {
      this.voiceStates.set(BigInt(x.user_id), {
        channelId: x.channel_id ? BigInt(x.channel_id) : null,
        deaf: x.deaf,
        guildId: x.guild_id ? BigInt(x.guild_id) : undefined,
        userId: BigInt(x.user_id),
        member: x.member ? new Member(x.member, client, this.id) : undefined,
        mute: x.mute,
        selfDeaf: x.self_deaf,
        selfMute: x.self_mute,
        sessionId: x.session_id,
        suppress: x.suppress,
        selfVideo: x.self_video,
        selfStream: x.self_stream,
        __priority: 0,
        requestToSpeakTimestamp: x.request_to_speak_timestamp
          ? new Date(x.request_to_speak_timestamp)
          : null,
      });
    });

    data.members?.forEach((x) =>
      this.members.set(
        BigInt(<snowflake>x.user?.id),
        new Member(x, client, this.id),
      ),
    );
    data.channels?.forEach((x) =>
      this.channels.set(BigInt(x.id), new Channel(x, client, this.id)),
    );

    data.threads?.forEach((x) =>
      this.threads.set(BigInt(x.id), new Channel(x, client)),
    );
    data.presences?.forEach((x) => {
      this.presences.set(BigInt(x.user.id), {
        activities: x.activities,
        clientStatus: x.client_status,
        guildId: x.guild_id ? BigInt(x.guild_id) : undefined,
        status: x.status,
        user: new User(x.user, client),
        __priority: 0,
      });
    });

    data.stage_instances?.forEach((x) => {
      this.stageInstances.set(BigInt(x.id), {
        channelId: BigInt(x.channel_id),
        guildId: x.guild_id ? BigInt(x.guild_id) : undefined,
        id: BigInt(x.id),
        privacy: x.privacy_level,
        topic: x.topic,
        discoverableDisabled: x.discoverable_disabled,
        guildScheduledEventId: x.guild_scheduled_event_id
          ? BigInt(x.guild_scheduled_event_id)
          : null,
        __priority: 0,
      });
    });

    this.memberCount = data.member_count;

    data.guild_scheduled_events?.forEach((x) => {
      this.guildScheduledEvents.set(BigInt(x.id), {
        channelId: x.channel_id ? BigInt(x.channel_id) : null,
        description: x.description,
        entityMetadata: x.entity_metadata,
        entityType: x.entity_type,
        guildId: BigInt(x.guild_id),
        id: BigInt(x.id),
        name: x.name,
        privacy: x.privacy_level,
        scheduledStartTime: new Date(x.scheduled_start_time),
        scheduledEndTime: x.scheduled_end_time
          ? new Date(x.scheduled_end_time)
          : null,
        status: x.status,
        userCount: x.user_count,
        creatorId: x.creator_id ? BigInt(x.creator_id) : null,
        creator: x.creator ? new User(x.creator, client) : undefined,
      });
    });

    this.#clean();
  }
  get parsedSnowflake() {
    return parseSnowflake(this.id);
  }
  #clean() {
    for (const key in this) if (this[key] === undefined) delete this[key];
  }
  get [Symbol.toStringTag]() {
    return this.id;
  }
}
