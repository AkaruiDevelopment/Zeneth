import User from "./User.js";
export default class Sticker {
    id;
    packId;
    name;
    description;
    tags;
    asset;
    type;
    formatType;
    available;
    guildId;
    user;
    sortValue;
    #client;
    constructor(data, client) {
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
        for (const key in this)
            if (this[key] === undefined)
                delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }
}
//# sourceMappingURL=Sticker.js.map