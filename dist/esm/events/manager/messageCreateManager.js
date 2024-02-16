import Message from '../../classes/Message.js';
import { GatewayEventNames } from '../../typings/enums.js';
export default function MessageCreate(data, client) {
    if (!client.__on__.MESSAGE_CREATE)
        return;
    const message = new Message(data.d, client);
    client.emit(GatewayEventNames.MessageCreate, message);
}
//# sourceMappingURL=messageCreateManager.js.map