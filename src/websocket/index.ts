import ws from "ws";
import {
    GatewayDispatchData,
    GatewayEventData,
    GatewayHelloData,
} from "../typings/interface.js";
import { GatewayOpCodes } from "../typings/enums.js";
import Client from "../client/index.js";
import EventManager from "../events/index.js";
import { canReconnectOnCodes, errorCodeMessages } from "../utils/constants.js";
import { createDebug } from "../utils/helpers.js";
import { ZenethError } from "../error/index.js";

export default class Websocket {
    ws: ws;
    heartbeat: {
        interval: number;
        timer: NodeJS.Timeout | null;
    } = {
        interval: 0,
        timer: null,
    };

    data: {
        s: number | null;
        lastPing: number;
        ping: number;
        initialReadyAt?: number;
        currentReadyAt?: number;
    } = {
        s: null,
        lastPing: 0,
        ping: 0,
    };

    #client: Client;

    constructor(client: Client) {
        this.ws = new ws("wss://gateway.discord.gg/?v=10&encoding=json", {
            handshakeTimeout: 30000,
        });
        this.#handleEvents();
        this.data.initialReadyAt = Date.now();
        this.#client = client;
    }

    #handleEvents() {
        this.ws.on("open", () => {
            createDebug(
                {
                    message: "Connected to Discord Gateway",
                    timestamp: Date.now(),
                    status: "open",
                },
                this.#client,
            );
        });

        this.ws.on("close", (code, msg) => {
            createDebug(
                {
                    message: `Disconnected from Discord Gateway with code ${code}`,
                    timestamp: Date.now(),
                    status: "close",
                },
                this.#client,
            );
            //@ts-ignore
            if (canReconnectOnCodes[code]) this.#reconnect();
            else if (
                canReconnectOnCodes[
                    code as keyof typeof canReconnectOnCodes
                ] === undefined
            )
                this.#reconnect();
            else if (
                canReconnectOnCodes[
                    code as keyof typeof canReconnectOnCodes
                ] === false
            )
                throw ZenethError.WebSocketError(
                    errorCodeMessages[
                        code as keyof typeof canReconnectOnCodes
                    ] ?? "Unknown Error",
                    code,
                );
            else throw ZenethError.WebSocketError(msg.toString(), code);
        });

        this.ws.on("message", (data) => {
            const jsonData: GatewayEventData = JSON.parse(data.toString());
            createDebug(
                {
                    message: jsonData,
                    timestamp: Date.now(),
                    status: "message",
                },
                this.#client,
            );
            if (jsonData.op === GatewayOpCodes.Hello) {
                this.heartbeat.interval = (<GatewayHelloData>(
                    jsonData
                )).d.heartbeat_interval;

                setTimeout(() => {
                    this.#ackHeartbeat();
                    this.#identify();
                    const timer = setInterval(
                        () => this.#ackHeartbeat(),
                        this.heartbeat.interval,
                    );
                    this.heartbeat.timer = timer;
                }, 1000);
            } else if (jsonData.op === GatewayOpCodes.HeartbeatAck) {
                this.data.ping = Date.now() - this.data.lastPing;
            } else if (jsonData.op === GatewayOpCodes.Dispatch) {
                this.data.s = <number>jsonData.s;
                EventManager(<GatewayDispatchData>jsonData, this.#client);
            } else if (jsonData.op === GatewayOpCodes.Reconnect) {
                if (this.heartbeat.timer) clearInterval(this.heartbeat.timer);
                this.ws.close();
                this.#resume();
            } else if (jsonData.op === GatewayOpCodes.InvalidSession) {
                if (this.heartbeat.timer) clearInterval(this.heartbeat.timer);
                this.ws.close();
                if (jsonData.d) this.#resume();
                else this.#reconnect();
            }
        });
    }

    #ackHeartbeat() {
        const data = {
            op: GatewayOpCodes.Heartbeat,
            d: this.data.s,
        };
        this.data.lastPing = Date.now();
        this.ws.send(JSON.stringify(data));
    }

    #identify() {
        const data = {
            op: GatewayOpCodes.Identify,
            d: {
                token: this.#client.token,
                intents: this.#client.intents,
                properties: {
                    os:
                        this.#client.options.identify?.properties?.os ??
                        process.platform,
                    browser:
                        this.#client.options.identify?.properties?.browser ??
                        "Uzumi",
                    device:
                        this.#client.options.identify?.properties?.device ??
                        "Uzumi",
                },
                compress: this.#client.options.identify?.compress ?? false,
                large_threshold:
                    this.#client.options.identify?.largeThreshold ?? 250,
                shard: this.#client.options.identify?.shard ?? [0, 1],
                presence: this.#client.options.identify?.presence,
            },
        };

        this.ws.send(JSON.stringify(data));
    }
    #resume() {
        const data = {
            op: GatewayOpCodes.Resume,
            d: {
                token: this.#client.token,
                session_id: this.#client.readyData.sessionId,
                seq: this.data.s,
            },
        };
        this.ws = new ws(this.#client.readyData.resumeGatewayUrl);
        this.#handleEvents();
        let RetryCounts = 0;
        this.ws.once("open", () => {
            if (this.ws.readyState !== ws.OPEN) {
                const interval = setTimeout(() => {
                    if (this.ws.readyState === ws.OPEN) {
                        this.ws.send(JSON.stringify(data));
                        this.data.currentReadyAt = Date.now();
                        clearInterval(interval);
                        createDebug(
                            {
                                message: "Resuming to Discord Gateway",
                                timestamp: Date.now(),
                                status: "resume",
                            },
                            this.#client,
                        );
                    } else {
                        if (RetryCounts === 10) {
                            createDebug(
                                {
                                    message:
                                        "Failed to resume to Discord Gateway after 10 retries. Closing connection",
                                    timestamp: Date.now(),
                                    status: "error",
                                },
                                this.#client,
                            );
                            clearInterval(interval);
                            this.ws.close();
                            process.exit(1);
                        }
                        createDebug(
                            {
                                message:
                                    "Failed to resume to Discord Gateway, Retrying in 10 seconds",
                                timestamp: Date.now(),
                                status: "error",
                            },
                            this.#client,
                        );
                        RetryCounts++;
                    }
                }, 10000);
            } else {
                this.ws.send(JSON.stringify(data));
                this.data.currentReadyAt = Date.now();
                createDebug(
                    {
                        message: "Resuming to Discord Gateway",
                        timestamp: Date.now(),
                        status: "resume",
                    },
                    this.#client,
                );
            }
        });

        createDebug(
            {
                message: "Resumed to Discord Gateway",
                timestamp: Date.now(),
                status: "resume",
            },
            this.#client,
        );
    }
    #reconnect() {
        const url = "wss://gateway.discord.gg/?v=10&encoding=json";
        this.ws.close();
        this.ws.removeAllListeners();
        this.ws = new ws(url);
        this.#handleEvents();
        this.data.currentReadyAt = Date.now();
        createDebug(
            {
                message: "Reconnected to Discord Gateway",
                timestamp: Date.now(),
                status: "reconnect",
            },
            this.#client,
        );
    }
}
