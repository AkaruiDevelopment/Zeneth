/// <reference types="node" />
import Client from "../client/index.js";
import { Queue } from "../typings/interface.js";
export default class QueueManager {
    #private;
    queue: Map<string, Queue>;
    timer: Map<string, NodeJS.Timeout>;
    constructor(client: Client);
    add(queue: Queue): void;
    get(route: string): Queue | undefined;
    delete(route: string): void;
    has(route: string): boolean;
}
//# sourceMappingURL=queue.d.ts.map