export default function userSweeper(collection, type) {
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
//# sourceMappingURL=userManager.js.map