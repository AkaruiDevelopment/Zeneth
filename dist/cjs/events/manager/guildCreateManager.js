"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Guild_js_1 = __importDefault(require("../../classes/Guild.js"));
const enums_js_1 = require("../../typings/enums.js");
function GuildCreate(data, client) {
    if (!client.__on__.GUILD_CREATE)
        return;
    const guild = new Guild_js_1.default(data.d, client);
    client.emit(enums_js_1.GatewayEventNames.GuildCreate, guild);
}
exports.default = GuildCreate;
//# sourceMappingURL=guildCreateManager.js.map