"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueueManager {
    queue = new Map();
    timer = new Map();
    #client;
    constructor(client) {
        this.#client = client;
    }
    add(queue) {
        this.queue.set(queue.route, queue);
        this.timer.set(queue.route, setTimeout(() => {
            this.delete(queue.route);
        }, queue.resetAfter));
    }
    get(route) {
        return this.queue.get(route);
    }
    delete(route) {
        this.queue.delete(route);
        this.timer.delete(route);
    }
    has(route) {
        return this.queue.has(route);
    }
}
exports.default = QueueManager;
//# sourceMappingURL=queue.js.map