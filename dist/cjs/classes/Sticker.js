"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("./User.js"));
class Sticker {
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
        this.user = data.user ? new User_js_1.default(data.user, client) : undefined;
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
exports.default = Sticker;
//# sourceMappingURL=Sticker.js.map