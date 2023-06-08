"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../index.js");
const index_js_2 = require("../../classes/index.js");
function InteractionCreate(data, client) {
    const interaction = new index_js_2.Interaction(data.d, client);
    return client.emit(index_js_1.GatewayEventNames.InteractionCreate, interaction);
}
exports.default = InteractionCreate;
//# sourceMappingURL=interactionCreateManager.js.map