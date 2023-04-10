import User from "./User.js";
import { parseSnowflake } from "../utils/helpers.js";
export default class Emoji {
    id;
    name;
    roles;
    user;
    require_colons;
    managed;
    animated;
    available;
    #client;
    guildId;
    __priority;
    constructor(data, client, guild) {
        this.#client = client;
        this.id = data.id ? BigInt(data.id) : null;
        this.name = data.name;
        this.roles = data.roles?.map((role) => BigInt(role));
        this.user = data.user ? new User(data.user, client) : undefined;
        this.require_colons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.guildId = guild ? BigInt(guild) : undefined;
        this.__priority = 0;
        this.#clean();
    }
    #clean() {
        for (const key in this)
            if (this[key] === undefined)
                delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.name ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.id;
    }
    get parsedSnowflake() {
        return this.id ? parseSnowflake(this.id) : null;
    }
    toString() {
        return this.name ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.id;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            roles: this.roles,
            user: this.user,
            require_colons: this.require_colons,
            managed: this.managed,
            animated: this.animated,
            available: this.available,
        };
    }
    async fetch() {
        if (!this.id || !this.guildId)
            return null;
        const data = await this.#client.getGuildEmoji(this.guildId, this.id);
        if (!data)
            return null;
        this.#updateThis(data);
        return data;
    }
    #updateThis(data) {
        this.name = data.name;
        this.roles = data.roles;
        this.user = data.user;
        this.require_colons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.#clean();
    }
    update(data) {
        this.id = data.id ? BigInt(data.id) : null;
        this.name = data.name;
        this.roles = data.roles?.map((role) => BigInt(role));
        this.user = data.user ? new User(data.user, this.#client) : undefined;
        this.require_colons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.#clean();
    }
    async modify(data) {
        if (!this.id || !this.guildId)
            return null;
        const emoji = await this.#client.modifyGuildEmoji(this.guildId, this.id, data);
        if (!emoji)
            return null;
        this.#updateThis(emoji);
        return emoji;
    }
    async delete() {
        if (!this.id || !this.guildId)
            return null;
        return await this.#client.deleteGuildEmoji(this.guildId, this.id);
    }
}
//# sourceMappingURL=Emoji.js.map