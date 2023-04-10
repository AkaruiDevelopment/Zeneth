import { GatewayEventNames } from '../typings/enums.js';
import Ready from './manager/readyManager.js';
import MessageCreate from './manager/messageCreateManager.js';
import ChannelCreate from './manager/channelCreateManager.js';
import GuildCreate from './manager/guildCreateManager.js';
export default function EventManager(data, client) {
    switch (data.t) {
        case GatewayEventNames.Hello:
            break;
        case GatewayEventNames.Ready:
            Ready(data, client);
            break;
        case GatewayEventNames.MessageCreate:
            MessageCreate(data, client);
            break;
        case GatewayEventNames.ChannelCreate:
            ChannelCreate(data, client);
            break;
        case GatewayEventNames.GuildCreate:
            GuildCreate(data, client);
            break;
    }
}
//# sourceMappingURL=index.js.map