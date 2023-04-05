import Channel from '../../../classes/Channel.js';
import { Snowflake } from '../../../typings/types.js';
import { Cacher } from '../Cacher.js';
import Group from '../Group.js';

export default function channelUpdater(channel: Channel, cacher: Cacher) {
  const group = <Group<Snowflake, Channel>> cacher.channels;
  if (!group.config.cacheFunction(channel)) return;
  if (group.size >= group.config.size) {
    group.shift();
  }
  group.set(channel.id, channel);
}
