import {User} from "../../../classes/index.js";
import { Snowflake } from "../../../typings/types.js";
import { Cacher } from "../Cacher.js";
import Group from "../Group.js";

export default function userUpdater(user: User, cacher: Cacher,guildId?: Snowflake) {
    const group = <Group<Snowflake, User>>cacher.users;
    if (!group.config.cacheFunction(user)) return;
    if (group.size >= group.config.size) {
        group.shift();
    }
    guildId && user.guildIds?.push(guildId);
    group.set(user.id, user);
}
