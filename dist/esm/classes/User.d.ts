import Client from '../client/index.js';
import { Locales } from '../typings/enums.js';
import { RawUserData } from '../typings/interface.js';
import { Snowflake, integer } from '../typings/types.js';
export default class User {
    #private;
    id: Snowflake;
    username: string;
    discriminator: number;
    avatar?: bigint;
    bot?: boolean;
    system?: boolean;
    mfaEnabled?: boolean;
    banner?: bigint;
    accentColor?: integer;
    locale?: Locales;
    verified?: boolean;
    email?: string;
    flags?: integer;
    premiumType?: integer;
    publicFlags?: integer;
    constructor(data: RawUserData, client: Client);
    get tag(): string;
    avatarUrl(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    bannerUrl(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    get defaultAvatarURL(): string;
    get [Symbol.toStringTag](): bigint;
}
//# sourceMappingURL=User.d.ts.map