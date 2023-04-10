"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cacher = void 0;
const Group_js_1 = __importDefault(require("./Group.js"));
class Cacher {
    constructor(input) {
        for (const key of Object.keys(input)) {
            this[key] = new Group_js_1.default(input[key]);
        }
    }
}
exports.Cacher = Cacher;
//# sourceMappingURL=Cacher.js.map