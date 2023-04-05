import Message from '../../classes/Message.js'
import Client from '../../client/index.js'
import { GatewayEventNames } from '../../typings/enums.js'
import { GatewayMessageCreateData } from '../../typings/interface.js'

export default function MessageCreate (
  data: GatewayMessageCreateData,
  client: Client
)
{
  if(!client.__on__.MESSAGE_CREATE) return;
  const message = new Message(data.d, client)
  client.emit(GatewayEventNames.MessageCreate, message)
}
