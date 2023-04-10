"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function channelUpdater(channel, cacher) {
    const group = cacher.channels;
    if (!group.config.cacheFunction(channel))
        return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(channel.id, channel);
}
exports.default = channelUpdater;
//# sourceMappingURL=channelUpdater.js.map