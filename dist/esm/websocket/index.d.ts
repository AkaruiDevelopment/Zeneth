/// <reference types="node" />
import ws from 'ws';
import Client from '../client/index.js';
export default class Websocket {
    #private;
    ws: ws;
    heartbeat: {
        interval: number;
        timer: NodeJS.Timeout | null;
    };
    data: {
        s: number | null;
        lastPing: number;
        ping: number;
    };
    constructor(client: Client);
}
//# sourceMappingURL=index.d.ts.map