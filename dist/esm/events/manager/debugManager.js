import { GatewayEventNames } from "../../typings/enums.js";
export default function DebugManager(data, client) {
    client.emit(GatewayEventNames.Debug, data.d);
}
//# sourceMappingURL=debugManager.js.map