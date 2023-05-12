"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("./User.js"));
class Member {
    avatar;
    timeOut;
    deaf;
    joinedAt;
    mute;
    nick;
    pending;
    permissions;
    premiumSince;
    roles;
    user;
    guildId;
    constructor(data, client, guildId) {
        this.avatar = data.avatar;
        this.timeOut = data.communication_disabled_until
            ? new Date(data.communication_disabled_until)
            : undefined;
        this.deaf = data.deaf;
        this.joinedAt = new Date(data.joined_at);
        this.mute = data.mute;
        this.nick = data.nick;
        this.pending = data.pending;
        this.permissions = data.permissions;
        this.premiumSince = data.premium_since
            ? new Date(data.premium_since)
            : undefined;
        this.roles = data.roles.map(BigInt);
        this.user = data.user ? new User_js_1.default(data.user, client) : undefined;
        this.guildId = guildId ? BigInt(guildId) : undefined;
        this.#clean();
    }
    #clean() {
        for (const key in this)
            if (this[key] === undefined)
                delete this[key];
    }
    get [Symbol.toStringTag]() {
        return this.user?.id ?? this.nick;
    }
}
exports.default = Member;
//# sourceMappingURL=Member.js.map