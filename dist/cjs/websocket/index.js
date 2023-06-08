"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const enums_js_1 = require("../typings/enums.js");
const index_js_1 = __importDefault(require("../events/index.js"));
const constants_js_1 = require("../utils/constants.js");
const helpers_js_1 = require("../utils/helpers.js");
class Websocket {
    ws;
    heartbeat = {
        interval: 0,
        timer: null,
    };
    data = {
        s: null,
        lastPing: 0,
        ping: 0,
    };
    #client;
    constructor(client) {
        this.ws = new ws_1.default("wss://gateway.discord.gg/?v=10&encoding=json", {
            handshakeTimeout: 30000,
        });
        this.#handleEvents();
        this.data.initialReadyAt = Date.now();
        this.#client = client;
    }
    #handleEvents() {
        this.ws.on("open", () => {
            (0, helpers_js_1.createDebug)({
                message: "Connected to Discord Gateway",
                timestamp: Date.now(),
                status: "open",
            }, this.#client);
        });
        this.ws.on("close", (code) => {
            (0, helpers_js_1.createDebug)({
                message: `Disconnected from Discord Gateway with code ${code}`,
                timestamp: Date.now(),
                status: "close",
            }, this.#client);
            //@ts-ignore
            if (constants_js_1.canReconnectOnCodes[code])
                this.#resume();
            else
                this.#reconnect();
        });
        this.ws.on("message", (data) => {
            const jsonData = JSON.parse(data.toString());
            (0, helpers_js_1.createDebug)({
                message: jsonData,
                timestamp: Date.now(),
                status: "message",
            }, this.#client);
            if (jsonData.op === enums_js_1.GatewayOpCodes.Hello) {
                this.heartbeat.interval = (jsonData).d.heartbeat_interval;
                setTimeout(() => {
                    this.#ackHeartbeat();
                    this.#identify();
                    const timer = setInterval(() => this.#ackHeartbeat(), this.heartbeat.interval);
                    this.heartbeat.timer = timer;
                }, 1000);
            }
            else if (jsonData.op === enums_js_1.GatewayOpCodes.HeartbeatAck) {
                this.data.ping = Date.now() - this.data.lastPing;
            }
            else if (jsonData.op === enums_js_1.GatewayOpCodes.Dispatch) {
                this.data.s = jsonData.s;
                (0, index_js_1.default)(jsonData, this.#client);
            }
            else if (jsonData.op === enums_js_1.GatewayOpCodes.Reconnect) {
                if (this.heartbeat.timer)
                    clearInterval(this.heartbeat.timer);
                this.ws.close();
                this.#resume();
            }
            else if (jsonData.op === enums_js_1.GatewayOpCodes.InvalidSession) {
                if (this.heartbeat.timer)
                    clearInterval(this.heartbeat.timer);
                this.ws.close();
                if (jsonData.d)
                    this.#resume();
                else
                    this.#reconnect();
            }
        });
    }
    #ackHeartbeat() {
        const data = {
            op: enums_js_1.GatewayOpCodes.Heartbeat,
            d: this.data.s,
        };
        this.data.lastPing = Date.now();
        this.ws.send(JSON.stringify(data));
    }
    #identify() {
        const data = {
            op: enums_js_1.GatewayOpCodes.Identify,
            d: {
                token: this.#client.token,
                intents: this.#client.intents,
                properties: {
                    os: this.#client.options.identify?.properties?.os ??
                        process.platform,
                    browser: this.#client.options.identify?.properties?.browser ??
                        "Uzumi",
                    device: this.#client.options.identify?.properties?.device ??
                        "Uzumi",
                },
                compress: this.#client.options.identify?.compress ?? false,
                large_threshold: this.#client.options.identify?.largeThreshold ?? 250,
                shard: this.#client.options.identify?.shard ?? [0, 1],
                presence: this.#client.options.identify?.presence,
            },
        };
        this.ws.send(JSON.stringify(data));
    }
    #resume() {
        const data = {
            op: enums_js_1.GatewayOpCodes.Resume,
            d: {
                token: this.#client.token,
                session_id: this.#client.readyData.sessionId,
                seq: this.data.s,
            },
        };
        this.ws = new ws_1.default(this.#client.readyData.resumeGatewayUrl);
        this.#handleEvents();
        let RetryCounts = 0;
        this.ws.once("open", () => {
            const interval = setTimeout(() => {
                if (this.ws.readyState === ws_1.default.OPEN) {
                    this.ws.send(JSON.stringify(data));
                    this.data.currentReadyAt = Date.now();
                    clearInterval(interval);
                    (0, helpers_js_1.createDebug)({
                        message: "Resuming to Discord Gateway",
                        timestamp: Date.now(),
                        status: "resume",
                    }, this.#client);
                }
                else {
                    if (RetryCounts === 10) {
                        (0, helpers_js_1.createDebug)({
                            message: "Failed to resume to Discord Gateway after 10 retries. Closing connection",
                            timestamp: Date.now(),
                            status: "error",
                        }, this.#client);
                        clearInterval(interval);
                        this.ws.close();
                        process.exit(1);
                    }
                    (0, helpers_js_1.createDebug)({
                        message: "Failed to resume to Discord Gateway, Retrying in 10 seconds",
                        timestamp: Date.now(),
                        status: "error",
                    }, this.#client);
                    RetryCounts++;
                }
            }, 10000);
        });
        (0, helpers_js_1.createDebug)({
            message: "Resumed to Discord Gateway",
            timestamp: Date.now(),
            status: "resume",
        }, this.#client);
    }
    #reconnect() {
        const url = "wss://gateway.discord.gg/?v=10&encoding=json";
        this.ws = new ws_1.default(url);
        this.#handleEvents();
        this.data.currentReadyAt = Date.now();
        (0, helpers_js_1.createDebug)({
            message: "Reconnected to Discord Gateway",
            timestamp: Date.now(),
            status: "reconnect",
        }, this.#client);
    }
}
exports.default = Websocket;
//# sourceMappingURL=index.js.map