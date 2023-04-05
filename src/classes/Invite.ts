import Client from '../client/index.js';
import { InviteTargetTypes } from '../typings/enums.js';
import {
  RawApplicationData,
  RawChannelData,
  RawGuildData,
  RawGuildScheduledEventData,
  RawInviteData,
  RawUserData,
} from '../typings/interface.js';

export default class Invite
{
  #client: Client;
  approximateMemberCount: number | undefined;
  approximatePresenceCount: number | undefined;
  channel: RawChannelData;
  code: string;
  expiresAt: Date | undefined;
  guild: RawGuildData | undefined;
  guildScheduledEvent: RawGuildScheduledEventData | undefined;
  inviter: RawUserData | undefined;
  targetApplication: RawApplicationData | undefined;
  targetUser: RawUserData | undefined;
  targetType: InviteTargetTypes | undefined;
  constructor ( data: RawInviteData, client: Client )
  {
    this.#client = client;
    this.approximateMemberCount = data.approximate_member_count;
    this.approximatePresenceCount = data.approximate_presence_count;
    this.channel = data.channel;
    this.code = data.code;
    this.expiresAt = data.expires_at ? new Date( data.expires_at ) : undefined;
    this.guild = data.guild;
    this.guildScheduledEvent = data.guild_scheduled_event;
    this.inviter = data.inviter;
    this.targetApplication = data.target_application;
    this.targetUser = data.target_user;
    this.targetType = data.target_type;
  }
  #clean ()
  {
    for ( const key in this ) if ( this[ key ] === undefined ) delete this[ key ];
  }
  get [ Symbol.toStringTag ] ()
  {
    return this.code;
  }
}