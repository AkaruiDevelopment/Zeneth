import Client from "../client/index.js";
import { StickerFormatType } from "../typings/enums.js";
import { RawStickerData } from "../typings/interface.js";
import { Snowflake, integer } from "../typings/types.js";
import User from "./User.js";

export default class Sticker {
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
  #client: Client;
  constructor(data: RawStickerData, client: Client) {
    this.asset = data.asset;
    this.available = data.available;
    this.description = data.description;
    this.formatType = data.format_type;
    this.guildId = data.guild_id ? BigInt(data.guild_id) : undefined;
    this.id = BigInt(data.id);
    this.name = data.name;
    this.packId = data.pack_id ? BigInt(data.pack_id) : undefined;
    this.sortValue = data.sort_value;
    this.tags = data.tags;
    this.type = data.type;
    this.user = data.user ? new User(data.user, client) : undefined;
    this.#client = client;

    this.#clean();
  }
  #clean() {
    for (const key in this) if (this[key] === undefined) delete this[key];
  }

  get [ Symbol.toStringTag ] ()
  {
    return this.id;
  }
}