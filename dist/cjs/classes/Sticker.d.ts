import Client from "../client/index.js";
import { StickerFormatType } from "../typings/enums.js";
import { RawStickerData } from "../typings/interface.js";
import { Snowflake, integer } from "../typings/types.js";
import User from "./User.js";
export default class Sticker {
    #private;
    id: Snowflake;
    packId?: Snowflake;
    name: string;
    description: string | null;
    tags?: string;
    asset?: string;
    type: 1 | 2;
    formatType: StickerFormatType;
    available?: boolean;
    guildId?: Snowflake;
    user?: User;
    sortValue?: integer;
    constructor(data: RawStickerData, client: Client);
    get [Symbol.toStringTag](): bigint;
}
//# sourceMappingURL=Sticker.d.ts.map