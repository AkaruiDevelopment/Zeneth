import { Camelize, Channel, Member, Message, User } from "..";
import { InteractionResponsePayload, RawInteractionData, RawInteractionDataData } from "../typings/interface.js";
import Client from "../client/index.js";
import { InteractionTypes, Locales } from "../typings/enums.js";
export default class Interaction {
    #private;
    appPermissions: string | undefined;
    applicationId: bigint;
    channel: Channel | undefined;
    channelId: bigint | undefined;
    data: Camelize<RawInteractionDataData>;
    guildId: bigint | undefined;
    guildLocale?: Locales;
    id: bigint;
    locale?: Locales;
    member: Member | undefined;
    message: Message | undefined;
    token: string;
    type: InteractionTypes;
    user: User | undefined;
    version: number;
    constructor(data: RawInteractionData, client: Client);
    get [Symbol.toStringTag](): bigint;
    createResponse(type: InteractionTypes, data: InteractionResponsePayload): void;
}
//# sourceMappingURL=Interaction.d.ts.map