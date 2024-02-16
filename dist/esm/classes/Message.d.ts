import Client from '../client/index.js';
import { RawApplicationData, RawAttachmentData, RawChannelData, RawChannelMentionData, RawEmbedData, RawMessageActivityData, RawMessageComponentData, RawMessageData, RawMessageInteractionData, RawMessageReferenceData, RawReactionData, RawRoleSubscriptionData, RawStickerData, RawStickerItemData } from '../typings/interface.js';
import User from './User.js';
import { Camelize, Snowflake } from '../typings/types.js';
import Member from './Member.js';
export default class Message {
    #private;
    activity: Camelize<RawMessageActivityData | undefined> | Camelize<RawMessageActivityData | undefined>[];
    application: Camelize<RawApplicationData | undefined> | Camelize<RawApplicationData | undefined>[];
    application_id?: bigint | undefined;
    attachments: Camelize<RawAttachmentData[]> | Camelize<RawAttachmentData[]>[];
    guildId?: Snowflake | undefined;
    member?: Member | undefined;
    author: User;
    channelId: bigint;
    components: Camelize<RawMessageComponentData[] | undefined> | Camelize<RawMessageComponentData[] | undefined>[];
    content: string;
    editedTimestamp: any;
    embeds: Camelize<RawEmbedData[]> | Camelize<RawEmbedData[]>[];
    flags: number | undefined;
    id: bigint;
    interaction: Camelize<RawMessageInteractionData | undefined> | Camelize<RawMessageInteractionData | undefined>[];
    messageReference: Camelize<RawMessageReferenceData | undefined> | Camelize<RawMessageReferenceData | undefined>[];
    nonce: string | bigint | undefined;
    pinned: boolean;
    reactions: Camelize<RawReactionData[] | undefined> | Camelize<RawReactionData[] | undefined>[];
    referencedMessage: Message | undefined;
    stickers: Camelize<RawStickerData[] | undefined> | Camelize<RawStickerData[] | undefined>[];
    stickerItems: Camelize<RawStickerItemData[] | undefined> | Camelize<RawStickerItemData[] | undefined>[];
    timestamp: Date;
    tts: boolean;
    type: number;
    roleSubscriptionData: Camelize<RawRoleSubscriptionData | undefined> | Camelize<RawRoleSubscriptionData | undefined>[];
    webhookId?: bigint | undefined;
    thread: Camelize<RawChannelData | undefined> | Camelize<RawChannelData | undefined>[];
    mentions: {
        everyone: boolean;
        roles?: Snowflake[];
        users: User[];
        channels?: Camelize<RawChannelMentionData>[];
    };
    __priority: number;
    constructor(data: RawMessageData, client: Client);
    delete(): Promise<any>;
    get [Symbol.toStringTag](): bigint;
}
//# sourceMappingURL=Message.d.ts.map