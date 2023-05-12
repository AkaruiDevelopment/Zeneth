"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_js_1 = __importDefault(require("../../classes/Channel.js"));
const enums_js_1 = require("../../typings/enums.js");
function ChannelCreate(data, client) {
    if (!client.__on__.CHANNEL_CREATE)
        return;
    const channel = new Channel_js_1.default(data.d, client);
    client.emit(enums_js_1.GatewayEventNames.ChannelCreate, channel);
}
exports.default = ChannelCreate;
//# sourceMappingURL=channelCreateManager.js.map