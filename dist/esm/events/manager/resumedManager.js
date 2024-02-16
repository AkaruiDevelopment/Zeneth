import { GatewayEventNames } from '../../typings/enums.js';
export default function Resumed(_data, client) {
    client.emit(GatewayEventNames.Resumed);
}
//# sourceMappingURL=resumedManager.js.map