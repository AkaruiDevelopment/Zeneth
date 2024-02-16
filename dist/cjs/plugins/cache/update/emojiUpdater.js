"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function emojiUpdater(emoji, cacher) {
    const group = cacher.emojis;
    if (!group.config.cacheFunction(emoji))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(emoji.id, emoji);
}
exports.default = emojiUpdater;
//# sourceMappingURL=emojiUpdater.js.map