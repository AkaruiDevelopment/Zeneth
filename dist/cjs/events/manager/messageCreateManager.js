"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_js_1 = __importDefault(require("../../classes/Message.js"));
const enums_js_1 = require("../../typings/enums.js");
function MessageCreate(data, client) {
    if (!client.__on__.MESSAGE_CREATE)
        return;
    const message = new Message_js_1.default(data.d, client);
    client.emit(enums_js_1.GatewayEventNames.MessageCreate, message);
}
exports.default = MessageCreate;
//# sourceMappingURL=messageCreateManager.js.map