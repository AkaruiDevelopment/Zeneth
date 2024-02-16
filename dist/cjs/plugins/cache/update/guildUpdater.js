"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function guildUpdater(guild, cacher) {
    const group = cacher.guilds;
    if (!group.config.cacheFunction(guild))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(guild.id, guild);
}
exports.default = guildUpdater;
//# sourceMappingURL=guildUpdater.js.map