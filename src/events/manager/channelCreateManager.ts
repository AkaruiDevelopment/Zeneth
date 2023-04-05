import Channel from '../../classes/Channel.js';
import Client from '../../client/index.js'
import { GatewayEventNames } from '../../typings/enums.js'
import { GatewayChannelCreateData } from '../../typings/interface.js'

export default function ChannelCreate (
  data: GatewayChannelCreateData,
  client: Client
)
{
  if(!client.__on__.CHANNEL_CREATE) return;
  const channel = new Channel( data.d, client );
  client.emit(GatewayEventNames.ChannelCreate, channel)
}
