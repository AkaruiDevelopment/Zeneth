"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_js_1 = require("../../typings/enums.js");
const Cacher_js_1 = require("./Cacher.js");
const channelUpdater_js_1 = __importDefault(require("./update/channelUpdater.js"));
const emojiUpdater_js_1 = __importDefault(require("./update/emojiUpdater.js"));
const guildUpdater_js_1 = __importDefault(require("./update/guildUpdater.js"));
const messageUpdater_js_1 = __importDefault(require("./update/messageUpdater.js"));
const userUpdater_js_1 = __importDefault(require("./update/userUpdater.js"));
function createCacheManager(input, client) {
    const cacher = new Cacher_js_1.Cacher(input);
    const cacheNames = Object.keys(input);
    for (const cacheName of cacheNames) {
        switch (cacheName) {
            case 'messages':
                client.on(enums_js_1.GatewayEventNames.MessageCreate, (message) => (0, messageUpdater_js_1.default)(message, cacher));
                break;
            case 'channels':
                client.on(enums_js_1.GatewayEventNames.ChannelCreate, (channel) => (0, channelUpdater_js_1.default)(channel, cacher));
                client.on(enums_js_1.GatewayEventNames.GuildCreate, (guild) => {
                    for (const channel of guild.channels) {
                        (0, channelUpdater_js_1.default)(channel[1], cacher);
                    }
                });
                break;
            case 'guilds':
                client.on(enums_js_1.GatewayEventNames.GuildCreate, (guild) => (0, guildUpdater_js_1.default)(guild, cacher));
                break;
            case 'emojis':
                client.on(enums_js_1.GatewayEventNames.GuildCreate, (guild) => {
                    for (const emoji of guild.emojis.V()) {
                        (0, emojiUpdater_js_1.default)(emoji, cacher);
                    }
                });
                break;
            case 'users':
                client.on(enums_js_1.GatewayEventNames.GuildCreate, (guild) => {
                    for (const member of guild.members.V()) {
                        (0, userUpdater_js_1.default)(member.user, cacher, guild.id);
                    }
                });
                break;
        }
    }
    return cacher;
}
exports.default = createCacheManager;
//# sourceMappingURL=index.js.map