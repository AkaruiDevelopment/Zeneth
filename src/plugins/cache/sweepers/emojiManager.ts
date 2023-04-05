import Emoji from '../../../classes/Emoji.js';
import { Snowflake, SweeperType } from '../../../typings/types.js';
import Collection from '../Group.js';

export default function emojiSweeper(
  collection: Collection<Snowflake, Emoji>,
  type: Omit<SweeperType, 'noSweep'>,
) {
  if (type === 'timedSweep') {
    const timedMsgs = collection.filter(
      (x) =>
        Date.now() - (x.parsedSnowflake?.date?.getTime() ?? 0) >
        collection.config.sweeper.cacheTimeLimit,
    );
    for (const m of timedMsgs) collection.delete(<Snowflake>m.id);
  } else {
    const msgs = collection.filter((x) => !x.__priority);
    for (const m of msgs) collection.delete(<Snowflake>m.id);
  }
}
