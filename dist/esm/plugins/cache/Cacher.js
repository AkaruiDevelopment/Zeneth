import Group from './Group.js';
export class Cacher {
    constructor(input) {
        for (const key of Object.keys(input)) {
            this[key] = new Group(input[key]);
        }
    }
}
//# sourceMappingURL=Cacher.js.map