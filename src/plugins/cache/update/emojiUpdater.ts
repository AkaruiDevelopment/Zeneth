import { Emoji } from "../../../classes/index.js";
import { Snowflake } from "../../../typings/types.js";
import { Cacher } from "../Cacher.js";
import Group from "../Group.js";

export default function emojiUpdater(emoji: Emoji, cacher: Cacher) {
    const group = <Group<Snowflake, Emoji>>cacher.emojis;
    if (!group.config.cacheFunction(emoji)) return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    group.set(emoji.id as bigint, emoji);
}
