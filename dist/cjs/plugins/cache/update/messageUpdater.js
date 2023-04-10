"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function messageUpdater(message, cacher) {
    const group = cacher.messages;
    if (!group.config.cacheFunction(message))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(message.id, message);
}
exports.default = messageUpdater;
//# sourceMappingURL=messageUpdater.js.map