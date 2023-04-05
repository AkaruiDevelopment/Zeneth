import Channel from "../../classes/Channel.js";
import Emoji from "../../classes/Emoji.js";
import Guild from "../../classes/Guild.js";
import Message from "../../classes/Message.js";
import { GroupConfigOptions, SweeperOptions } from "../../typings/interface.js";
import { Snowflake, SweeperType } from "../../typings/types.js";
import channelSweeper from "./sweepers/channelManager.js";
import emojiSweeper from "./sweepers/emojiManager.js";
import guildSweeper from "./sweepers/guildManager.js";
import messageSweeper from "./sweepers/messageManager.js";
import {Group as G} from "@akarui/structures";
export default class Group<K = unknown, V = unknown> extends G<K, V> {
    config: {
        sweeper: {
            type: SweeperType;
            timer: SweeperOptions[ 'timer' ];
            timeLimit: number;
            cacheTimeLimit: number;
        };
        size: number;
        cacheFunction: Function;
        class: string;
  };
  constructor(
    config: GroupConfigOptions,
    it?: Iterable<readonly [K, V]> | undefined,
  ) {
      super( config.size ?? Infinity, it );
      //@ts-ignore
      this.config = config;
      if ( !this.config.sweeper ) this.config.sweeper = this.defaultSweep();
      if ( !this.config.size ) this.config.size = Infinity;
      if(!this.config.cacheFunction) this.config.cacheFunction = (...data:any[]) => true;
      this.#activateSweeper();
    }
    defaultSweep (): any
    {
        return { type: "noSweep", timer: null,timeLimit : 86400000, cacheTimeLimit: 86400000 };
    }
    get sweeperType ()
    {
        return this.config.sweeper.type;
    }
    #activateSweeper ()
    {
        if ( this.config.sweeper.type === 'noSweep' ) return;
        else
            setInterval( () =>
            {
                switch ( this.config.class )
                {
                    case 'Message':
                        messageSweeper( <Group<Snowflake, Message>> this, this.sweeperType );
                        break;
                    case 'Channel':
                        channelSweeper( <Group<Snowflake, Channel>> this, this.sweeperType );
                        break;
                    case 'Guild':
                        guildSweeper( <Group<Snowflake, Guild>> this, this.sweeperType );
                        break;
                    case 'Emoji':
                        emojiSweeper( <Group<Snowflake, Emoji>> this, this.sweeperType );
                        break;
                }
            }, this.config.sweeper.timeLimit );
    }

}