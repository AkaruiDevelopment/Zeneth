"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_js_1 = require("../../typings/enums.js");
function DebugManager(data, client) {
    client.emit(enums_js_1.GatewayEventNames.Debug, data.d);
}
exports.default = DebugManager;
//# sourceMappingURL=debugManager.js.map