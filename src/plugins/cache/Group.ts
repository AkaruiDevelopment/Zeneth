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

export default class Group<K = unknown, V = unknown> extends Map<K, V> {
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
    it?: Iterable<readonly [K, V]> | null | undefined,
  ) {
      super( it );
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

    filter ( func: ( val: V, key: K, grp: this ) => boolean )
    {
        const res: V[] = [];
        for ( const [key,value] of this.entries() )
        {
            if ( func( value, key, this ) ) res.push( value );
        }
        return res;
    }
    V ()
    {
        return [...this.values()];
    }
    K ()
    {
        return [...this.keys()];
    }
    top ( amount: number = 1)
    {
        const res = this.V().slice( 0, amount );
        if ( res.length === 0 ) return undefined;
        if ( res.length === 1 ) return res[ 0 ];
        return res;
    }
    bottom ( amount: number = 1)
    {
        const res = this.V().slice( -amount );
        if ( res.length === 0 ) return undefined;
        if ( res.length === 1 ) return res[ 0 ];
        return res;
    }
    shift ()
    {
        const key = this.keys().next().value;
        if ( !key ) return undefined;
        const val = this.get( key );
        this.delete( key );
        return val;
    }
    shiftN ( amount: number )
    {
        const res: V[] = [];
        for ( let i = 0; i < amount; i++ )
        {
            const val = this.shift();
            if ( !val ) break;
            res.push( val );
        }
        if ( res.length === 0 ) return undefined;
        if ( res.length === 1 ) return res[ 0 ];
        return res;
    }
    pop ()
    {
        const key = this.K()[ this.size - 1 ];
        if ( !key ) return undefined;
        const val = this.get( key );
        this.delete( key );
        return val;
    }
    popN ( amount: number )
    {
        const res: V[] = [];
        const keys = this.K();
        let index = keys.length - 1;
        for ( let i = 0; i < amount; i++ )
        {
            const val = this.get( keys[ index ] );
            if ( !val ) break;
            res.push( val );
            this.delete( keys[ index ] );
            index--;
        }
        if ( res.length === 0 ) return undefined;
        if ( res.length === 1 ) return res[ 0 ];
        return res;
    }
}