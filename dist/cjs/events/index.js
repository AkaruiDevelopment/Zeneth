"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_js_1 = require("../typings/enums.js");
const readyManager_js_1 = __importDefault(require("./manager/readyManager.js"));
const messageCreateManager_js_1 = __importDefault(require("./manager/messageCreateManager.js"));
const channelCreateManager_js_1 = __importDefault(require("./manager/channelCreateManager.js"));
const guildCreateManager_js_1 = __importDefault(require("./manager/guildCreateManager.js"));
const interactionCreateManager_js_1 = __importDefault(require("./manager/interactionCreateManager.js"));
function EventManager(data, client) {
    switch (data.t) {
        case enums_js_1.GatewayEventNames.Hello:
            break;
        case enums_js_1.GatewayEventNames.Ready:
            (0, readyManager_js_1.default)(data, client);
            break;
        case enums_js_1.GatewayEventNames.MessageCreate:
            (0, messageCreateManager_js_1.default)(data, client);
            break;
        case enums_js_1.GatewayEventNames.ChannelCreate:
            (0, channelCreateManager_js_1.default)(data, client);
            break;
        case enums_js_1.GatewayEventNames.GuildCreate:
            (0, guildCreateManager_js_1.default)(data, client);
            break;
        case enums_js_1.GatewayEventNames.InteractionCreate:
            (0, interactionCreateManager_js_1.default)(data, client);
            break;
    }
}
exports.default = EventManager;
//# sourceMappingURL=index.js.map