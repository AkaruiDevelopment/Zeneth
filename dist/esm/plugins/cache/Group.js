import channelSweeper from "./sweepers/channelManager.js";
import emojiSweeper from "./sweepers/emojiManager.js";
import guildSweeper from "./sweepers/guildManager.js";
import messageSweeper from "./sweepers/messageManager.js";
import { Group as G } from "@akarui/structures";
export default class Group extends G {
    config;
    constructor(config, it) {
        super(config.size ?? Infinity, it);
        //@ts-ignore
        this.config = config;
        if (!this.config.sweeper)
            this.config.sweeper = this.defaultSweep();
        if (!this.config.size)
            this.config.size = Infinity;
        if (!this.config.cacheFunction)
            this.config.cacheFunction = (...data) => true;
        this.#activateSweeper();
    }
    defaultSweep() {
        return { type: "noSweep", timer: null, timeLimit: 86400000, cacheTimeLimit: 86400000 };
    }
    get sweeperType() {
        return this.config.sweeper.type;
    }
    #activateSweeper() {
        if (this.config.sweeper.type === 'noSweep')
            return;
        else
            setInterval(() => {
                switch (this.config.class) {
                    case 'Message':
                        messageSweeper(this, this.sweeperType);
                        break;
                    case 'Channel':
                        channelSweeper(this, this.sweeperType);
                        break;
                    case 'Guild':
                        guildSweeper(this, this.sweeperType);
                        break;
                    case 'Emoji':
                        emojiSweeper(this, this.sweeperType);
                        break;
                }
            }, this.config.sweeper.timeLimit);
    }
}
//# sourceMappingURL=Group.js.map