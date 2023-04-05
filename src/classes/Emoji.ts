import {snowflake, Snowflake} from "../typings/types.js";
import {CreateGuildEmojiPayload, RawEmojiData} from "../typings/interface.js";
import User from "./User.js";
import Client from "../client/index.js";
import {parseSnowflake} from "../utils/helpers.js";

export default class Emoji {
    id: Snowflake | null;
    name: string | null;
    roles?: Snowflake[];
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
    #client: Client;
    guildId?: Snowflake;
    __priority: number;

    constructor(data: RawEmojiData,client: Client,guild?:snowflake) {
        this.#client= client;
        this.id = data.id ? BigInt(data.id) : null;
        this.name = data.name;
        this.roles = data.roles?.map((role:snowflake) => BigInt(role));
        this.user = data.user ? new User(data.user,client) : undefined;
        this.require_colons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.guildId = guild ? BigInt( guild ) : undefined;
        this.__priority = 0;
        this.#clean();
    }

    #clean() {
        for (const key in this) if (this[key] === undefined) delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.name ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.id;
    }

    get parsedSnowflake() {
        return this.id?  parseSnowflake(this.id) : null;
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
        if(!this.id || !this.guildId) return null;
        const data = await this.#client.getGuildEmoji(<Snowflake>this.guildId,this.id);

        if(!data) return null;
        this.#updateThis(data);
        return data;
    }
    #updateThis(data:Emoji) {
        this.name = data.name;
        this.roles = data.roles;
        this.user = data.user;
        this.require_colons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.#clean();
    }

    update(data:RawEmojiData) {
        this.id = data.id ? BigInt(data.id) : null;
        this.name = data.name;
        this.roles = data.roles?.map((role:snowflake) => BigInt(role));
        this.user = data.user ? new User(data.user,this.#client) : undefined;
        this.require_colons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.#clean();
    }

    async modify(data:Omit<CreateGuildEmojiPayload,'image'>) {
        if(!this.id || !this.guildId) return null;
        const emoji = await this.#client.modifyGuildEmoji(<Snowflake>this.guildId,this.id,data);
        if(!emoji) return null;
        this.#updateThis(emoji);
        return emoji;
    }

    async delete() {
        if(!this.id || !this.guildId) return null;
        return await this.#client.deleteGuildEmoji(<Snowflake>this.guildId,this.id);
    }
}