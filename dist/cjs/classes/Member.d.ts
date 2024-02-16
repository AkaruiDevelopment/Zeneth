import Client from '../client/index.js';
import { RawMemberData } from '../typings/interface.js';
import { Snowflake, snowflake } from '../typings/types.js';
import User from './User.js';
export default class Member {
    #private;
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
    constructor(data: RawMemberData, client: Client, guildId?: snowflake | Snowflake);
    get [Symbol.toStringTag](): string | bigint | undefined;
}
//# sourceMappingURL=Member.d.ts.map