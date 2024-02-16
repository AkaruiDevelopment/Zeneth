"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("../../classes/User.js"));
const enums_js_1 = require("../../typings/enums.js");
const helpers_js_1 = require("../../utils/helpers.js");
async function Ready(data, client) {
    const readyData = {
        user: new User_js_1.default(data.d.user, client),
        guilds: data.d.guilds,
        resumeGatewayUrl: data.d.resume_gateway_url,
        shard: data.d.shard,
        sessionId: data.d.session_id,
        application: ((0, helpers_js_1.convertToCamelCase)(data.d.application))
    };
    client.readyData = readyData;
    for (const f of client.__on__[enums_js_1.GatewayEventNames.Ready] ?? []) {
        await f(client);
    }
}
exports.default = Ready;
//# sourceMappingURL=readyManager.js.map