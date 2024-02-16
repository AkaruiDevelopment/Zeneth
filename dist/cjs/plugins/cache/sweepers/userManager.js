"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userSweeper(collection, type) {
    if (type === "timedSweep") {
        const timedMsgs = collection.filter((x) => Date.now() - x.parsedSnowflake.date.getTime() >
            collection.config.sweeper.cacheTimeLimit);
        for (const [key, _] of timedMsgs)
            collection.delete(key);
    }
    else {
        const msgs = collection.filter((x) => !x.__priority);
        for (const [key, _] of msgs)
            collection.delete(key);
    }
}
exports.default = userSweeper;
//# sourceMappingURL=userManager.js.map