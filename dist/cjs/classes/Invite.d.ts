import Client from '../client/index.js';
import { InviteTargetTypes } from '../typings/enums.js';
import { RawApplicationData, RawChannelData, RawGuildData, RawGuildScheduledEventData, RawInviteData, RawUserData } from '../typings/interface.js';
export default class Invite {
    #private;
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
    constructor(data: RawInviteData, client: Client);
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=Invite.d.ts.map