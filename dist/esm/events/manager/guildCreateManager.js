import Guild from '../../classes/Guild.js';
import { GatewayEventNames } from '../../typings/enums.js';
export default function GuildCreate(data, client) {
    if (!client.__on__.GUILD_CREATE)
        return;
    const guild = new Guild(data.d, client);
    client.emit(GatewayEventNames.GuildCreate, guild);
}
//# sourceMappingURL=guildCreateManager.js.map