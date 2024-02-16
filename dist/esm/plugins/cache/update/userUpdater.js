export default function userUpdater(user, cacher, guildId) {
    const group = cacher.users;
    if (!group.config.cacheFunction(user))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    guildId && user.guildIds?.push(guildId);
    group.set(user.id, user);
}
//# sourceMappingURL=userUpdater.js.map