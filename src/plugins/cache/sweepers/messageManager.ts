import Message from '../../../classes/Message.js';
import { Snowflake, SweeperType } from '../../../typings/types.js';
import Collection from '../Group.js';

export default function messageSweeper(
  collection: Collection<Snowflake, Message>,
  type: Omit<SweeperType, 'noSweep'>,
) {
  if (type === 'timedSweep') {
    const timedMsgs = collection.filter(
      (x) =>
        Date.now() - x.timestamp.getTime() >
        collection.config.sweeper.cacheTimeLimit,
    );
    for (const [key,_] of timedMsgs) collection.delete(key);
  } else {
    const msgs = collection.filter((x) => !x.__priority);
    for (const [key,_] of msgs) collection.delete(key);
  }
}
