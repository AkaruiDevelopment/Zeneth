import { Camelize, Channel, Member, Message, User } from "..";
import { InteractionResponsePayload, RawInteractionData, RawInteractionDataData, RawMessageComponentData, SelectOption } from "../typings/interface.js";
import Client from "../client/index.js";
import { ComponentTypes, InteractionTypes, Locales } from "../typings/enums.js";
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
    components?: Camelize<RawMessageComponentData>[];
    componentType?: ComponentTypes;
    customId: string | undefined;
    values?: SelectOption[];
    constructor(data: RawInteractionData, client: Client);
    get [Symbol.toStringTag](): bigint;
    createResponse(type: InteractionTypes, data: InteractionResponsePayload): void;
}
//# sourceMappingURL=Interaction.d.ts.map