"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_js_1 = require("../utils/helpers.js");
class User {
    id;
    username;
    discriminator;
    avatar;
    bot;
    system;
    mfaEnabled;
    banner;
    accentColor;
    locale;
    verified;
    email;
    flags;
    premiumType;
    publicFlags;
    bannerColor;
    globalName;
    displayName;
    avatarDecoration;
    #client;
    constructor(data, client) {
        this.#client = client;
        this.id = BigInt(data.id);
        this.username = data.username;
        this.discriminator = Number(data.discriminator);
        this.accentColor = data.accent_color;
        this.avatar = data.avatar ? (0, helpers_js_1.ConvertHexToBigInt)(data.avatar) : undefined;
        this.banner = data.banner ? (0, helpers_js_1.ConvertHexToBigInt)(data.banner) : undefined;
        this.bot = data.bot ?? false;
        this.email = data.email ?? undefined;
        this.flags = data.flags;
        this.locale = data.locale ?? undefined;
        this.mfaEnabled = data.mfa_enabled;
        this.premiumType = data.premium_type;
        this.publicFlags = data.public_flags;
        this.system = data.system ?? false;
        this.verified = data.verified ?? false;
        this.bannerColor = data.banner_color ?? undefined;
        this.globalName = data.global_name ?? undefined;
        this.displayName = data.display_name ?? undefined;
        this.avatarDecoration = data.avatar_decoration ? (0, helpers_js_1.ConvertHexToBigInt)(data.avatar_decoration.split("_").slice(1).join("_")) : undefined;
        this.#clean();
    }
    #clean() {
        for (const key in this) {
            if (this[key] === undefined || this[key] === null)
                delete this[key];
        }
    }
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
    avatarUrl(options = {
        size: 4096,
        format: 'png',
        dynamic: true,
    }) {
        if (!this.avatar)
            return null;
        const { size, format, dynamic } = options;
        const hash = (0, helpers_js_1.ConvertBigIntToHex)(this.avatar);
        const ext = dynamic && format === 'png' && hash.startsWith('a_') ? 'gif' : format;
        return `https://cdn.discordapp.com/avatars/${this.id}/${hash}.${ext}?size=${size}`;
    }
    bannerUrl(options = {
        size: 4096,
        format: 'png',
        dynamic: true,
    }) {
        if (!this.banner)
            return null;
        const { size, format, dynamic } = options;
        const hash = (0, helpers_js_1.ConvertBigIntToHex)(this.banner);
        const ext = dynamic && format === 'png' && hash.startsWith('a_') ? 'gif' : format;
        return `https://cdn.discordapp.com/banners/${this.id}/${hash}.${ext}?size=${size}`;
    }
    get defaultAvatarURL() {
        return `https://cdn.discordapp.com/embed/avatars/${this.discriminator % 5}.png`;
    }
    get [Symbol.toStringTag]() {
        return this.id;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map