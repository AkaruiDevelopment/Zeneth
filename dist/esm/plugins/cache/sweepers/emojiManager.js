export default function emojiSweeper(collection, type) {
    if (type === 'timedSweep') {
        const timedMsgs = collection.filter((x) => Date.now() - (x.parsedSnowflake?.date?.getTime() ?? 0) >
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
//# sourceMappingURL=emojiManager.js.map