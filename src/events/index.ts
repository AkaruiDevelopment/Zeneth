import Client from '../client/index.js'
import { GatewayEventNames } from '../typings/enums.js'
import { GatewayChannelCreateData, GatewayDispatchData, GatewayGuildCreateData, GatewayInteractionCreateData, GatewayMessageCreateData, GatewayReadyData } from '../typings/interface.js'
import Ready from './manager/readyManager.js'
import MessageCreate from './manager/messageCreateManager.js'
import ChannelCreate from './manager/channelCreateManager.js';
import GuildCreate from './manager/guildCreateManager.js';
import InteractionCreate from './manager/interactionCreateManager.js';
export default function EventManager (
  data: GatewayDispatchData,
  client: Client
) {
  switch (data.t) {
    case GatewayEventNames.Hello:
      break;
    case GatewayEventNames.Ready:
      Ready( <GatewayReadyData> data, client );
      break;
    case GatewayEventNames.MessageCreate:
      MessageCreate( <GatewayMessageCreateData> data, client );
      break;
    case GatewayEventNames.ChannelCreate:
      ChannelCreate( <GatewayChannelCreateData> data, client );
      break;
    case GatewayEventNames.GuildCreate:
      GuildCreate( <GatewayGuildCreateData> data, client );
      break;
    case GatewayEventNames.InteractionCreate:
      InteractionCreate(<GatewayInteractionCreateData>data, client);
      break;
  }
}
