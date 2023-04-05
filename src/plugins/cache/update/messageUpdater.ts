import Message from '../../../classes/Message.js';
import { Snowflake } from '../../../typings/types.js';
import { Cacher } from '../Cacher.js';
import Group from '../Group.js';

export default function messageUpdater(message: Message, cacher: Cacher) {
  const group = <Group<Snowflake, Message>> cacher.messages;
  if(!group.config.cacheFunction(message)) return;
  if ( group.size >= group.config.size )
  {
    group.shift();
  }
  group.set(message.id, message);
}
