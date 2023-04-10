"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channelManager_js_1 = __importDefault(require("./sweepers/channelManager.js"));
const emojiManager_js_1 = __importDefault(require("./sweepers/emojiManager.js"));
const guildManager_js_1 = __importDefault(require("./sweepers/guildManager.js"));
const messageManager_js_1 = __importDefault(require("./sweepers/messageManager.js"));
const structures_1 = require("@akarui/structures");
class Group extends structures_1.Group {
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
                        (0, messageManager_js_1.default)(this, this.sweeperType);
                        break;
                    case 'Channel':
                        (0, channelManager_js_1.default)(this, this.sweeperType);
                        break;
                    case 'Guild':
                        (0, guildManager_js_1.default)(this, this.sweeperType);
                        break;
                    case 'Emoji':
                        (0, emojiManager_js_1.default)(this, this.sweeperType);
                        break;
                }
            }, this.config.sweeper.timeLimit);
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map