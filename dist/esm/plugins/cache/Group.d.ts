import { GroupConfigOptions, SweeperOptions } from "../../typings/interface.js";
import { SweeperType } from "../../typings/types.js";
import { Group as G } from "@akarui/structures";
export default class Group<K = unknown, V = unknown> extends G<K, V> {
    #private;
    config: {
        sweeper: {
            type: SweeperType;
            timer: SweeperOptions["timer"];
            timeLimit: number;
            cacheTimeLimit: number;
        };
        size: number;
        cacheFunction: Function;
        class: string;
    };
    constructor(config: GroupConfigOptions, it?: Iterable<readonly [K, V]> | undefined);
    defaultSweep(): any;
    get sweeperType(): SweeperType;
    get(key: K): V | undefined;
    find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    filter(fn: (val: V, key: K, grp: this) => boolean): G<K, V>;
}
//# sourceMappingURL=Group.d.ts.map