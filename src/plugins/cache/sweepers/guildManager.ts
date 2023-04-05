import Guild from '../../../classes/Guild.js';
import { Snowflake, SweeperType } from '../../../typings/types.js';
import Collection from '../Group.js';

export default function guildSweeper(
  collection: Collection<Snowflake, Guild>,
  type: Omit<SweeperType, 'noSweep'>,
) {
  if (type === 'timedSweep') {
    const timedMsgs = collection.filter(
      (x) =>
        Date.now() - x.parsedSnowflake?.date.getTime() >
        collection.config.sweeper.cacheTimeLimit,
    );
    for (const m of timedMsgs) collection.delete(m.id);
  } else {
    const msgs = collection.filter((x) => !x.__priority);
    for (const m of msgs) collection.delete(m.id);
  }
}
