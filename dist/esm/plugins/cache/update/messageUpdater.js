export default function messageUpdater(message, cacher) {
    const group = cacher.messages;
    if (!group.config.cacheFunction(message))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(message.id, message);
}
//# sourceMappingURL=messageUpdater.js.map