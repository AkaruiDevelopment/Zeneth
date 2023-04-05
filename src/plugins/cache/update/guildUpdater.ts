import Guild from '../../../classes/Guild.js';
import { Snowflake } from '../../../typings/types.js';
import { Cacher } from '../Cacher.js';
import Group from '../Group.js';

export default function guildUpdater(guild: Guild, cacher: Cacher) {
  const group = <Group<Snowflake, Guild>> cacher.guilds;
  if (!group.config.cacheFunction(guild)) return;
  if (group.size >= group.config.size) {
    group.shift();
  }
  group.set(guild.id, guild);
}
