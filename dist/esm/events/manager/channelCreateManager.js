import Channel from '../../classes/Channel.js';
import { GatewayEventNames } from '../../typings/enums.js';
export default function ChannelCreate(data, client) {
    if (!client.__on__.CHANNEL_CREATE)
        return;
    const channel = new Channel(data.d, client);
    client.emit(GatewayEventNames.ChannelCreate, channel);
}
//# sourceMappingURL=channelCreateManager.js.map