import Guild from '../../classes/Guild.js';
import Client from '../../client/index.js'
import { GatewayEventNames } from '../../typings/enums.js'
import { GatewayGuildCreateData } from '../../typings/interface.js'

export default function GuildCreate (
  data: GatewayGuildCreateData,
  client: Client
)
{
  if(!client.__on__.GUILD_CREATE) return;
  const guild = new Guild( data.d, client );
  client.emit(GatewayEventNames.GuildCreate, guild)
}
