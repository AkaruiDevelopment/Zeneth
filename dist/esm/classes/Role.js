import { ConvertHexToBigInt, convertToCamelCase } from "../utils/helpers.js";
export default class Role {
    #client;
    color;
    hoist;
    icon;
    id;
    managed;
    mentionable;
    name;
    permissions;
    position;
    tags;
    unicodeEmoji;
    constructor(data, client) {
        this.#client = client;
        this.color = data.color;
        this.hoist = data.hoist;
        this.icon = data.icon ? ConvertHexToBigInt(data.icon) : undefined;
        this.id = data.id;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.name = data.name;
        this.permissions = data.permissions;
        this.position = data.position;
        this.tags = convertToCamelCase(data.tags);
        this.unicodeEmoji = data.unicode_emoji;
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
//# sourceMappingURL=Role.js.map