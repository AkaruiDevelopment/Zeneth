import Client from '../client/index.js';
import { RawMemberData } from '../typings/interface.js';
import { Snowflake, snowflake } from '../typings/types.js';
import User from './User.js';

export default class Member {
  avatar: string | undefined;
  timeOut: Date | undefined;
  deaf: boolean;
  joinedAt: Date;
  mute: boolean;
  nick: string | undefined;
  pending: boolean | undefined;
  permissions: string | undefined;
  premiumSince: Date | undefined;
  roles: Snowflake[];
  user?: User;
  guildId?: Snowflake;
  constructor(data: RawMemberData, client: Client,guildId?: snowflake | Snowflake) {
    this.avatar = data.avatar;
    this.timeOut = data.communication_disabled_until
      ? new Date(data.communication_disabled_until)
      : undefined;
    this.deaf = data.deaf;
    this.joinedAt = new Date(data.joined_at);
    this.mute = data.mute;
    this.nick = data.nick;
    this.pending = data.pending;
    this.permissions = data.permissions;
    this.premiumSince = data.premium_since
      ? new Date(data.premium_since)
      : undefined;
    this.roles = data.roles.map(BigInt);
    this.user = data.user ? new User( data.user, client ) : undefined;
    this.guildId = guildId ? BigInt( guildId ) : undefined;
    this.#clean();
  }
  #clean() {
    for (const key in this) if (this[key] === undefined) delete this[key];
  }
  get [Symbol.toStringTag]() {
    return this.user?.id ?? this.nick;
  }
  
}
