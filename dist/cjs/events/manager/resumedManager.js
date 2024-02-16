"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_js_1 = require("../../typings/enums.js");
function Resumed(_data, client) {
    client.emit(enums_js_1.GatewayEventNames.Resumed);
}
exports.default = Resumed;
//# sourceMappingURL=resumedManager.js.map