"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userUpdater(user, cacher, guildId) {
    const group = cacher.users;
    if (!group.config.cacheFunction(user))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    guildId && user.guildIds?.push(guildId);
    group.set(user.id, user);
}
exports.default = userUpdater;
//# sourceMappingURL=userUpdater.js.map