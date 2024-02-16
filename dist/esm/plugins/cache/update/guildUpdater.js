export default function guildUpdater(guild, cacher) {
    const group = cacher.guilds;
    if (!group.config.cacheFunction(guild))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(guild.id, guild);
}
//# sourceMappingURL=guildUpdater.js.map