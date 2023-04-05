import Client from "../../client/index.js";
import { GatewayEventNames } from "../../typings/enums.js";
import { GroupConfigOptions } from "../../typings/interface.js";
import { Cacher } from "./Cacher.js";
import channelUpdater from "./update/channelUpdater.js";
import guildUpdater from "./update/guildUpdater.js";
import messageUpdater from "./update/messageUpdater.js";

export default function createCacheManager (input:Record<string,GroupConfigOptions>,client:Client)
{
    const cacher = new Cacher( input );
    const cacheNames = Object.keys( input );
    for ( const cacheName of cacheNames )
    {
        switch ( cacheName )
        {
            case 'messages':
                client.on( GatewayEventNames.MessageCreate, ( message ) => messageUpdater( message, cacher ) );
                break;
            case 'channels':
                client.on( GatewayEventNames.ChannelCreate, ( channel ) => channelUpdater( channel, cacher ) );
                client.on(GatewayEventNames.GuildCreate, (guild) => {
                    for (const channel of guild.channels) {
                        channelUpdater(channel[1], cacher);
                    }
                } );
                break;
            case 'guilds':
                client.on( GatewayEventNames.GuildCreate, ( guild ) => guildUpdater( guild, cacher ) );
                break;
        }
    }
    return cacher;
}