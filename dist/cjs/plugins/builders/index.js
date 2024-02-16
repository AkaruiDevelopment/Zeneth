"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBuilder = exports.AttachmentBuilder = void 0;
__exportStar(require("./type.js"), exports);
__exportStar(require("./enum.js"), exports);
__exportStar(require("./interface.js"), exports);
var Attachment_js_1 = require("./Attachment.js");
Object.defineProperty(exports, "AttachmentBuilder", { enumerable: true, get: function () { return __importDefault(Attachment_js_1).default; } });
var Embed_js_1 = require("./Embed.js");
Object.defineProperty(exports, "EmbedBuilder", { enumerable: true, get: function () { return __importDefault(Embed_js_1).default; } });
//# sourceMappingURL=index.js.map