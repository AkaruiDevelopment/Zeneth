export declare const canReconnectOnCodes: {
    4000: boolean;
    4001: boolean;
    4002: boolean;
    4003: boolean;
    4004: boolean;
    4005: boolean;
    4007: boolean;
    4008: boolean;
    4009: boolean;
    4010: boolean;
    4011: boolean;
    4012: boolean;
    4013: boolean;
    4014: boolean;
};
export declare const errorCodeMessages: {
    readonly "4000": "Unknown Error -> an unknown error occurred";
    readonly "4001": "Unknown Opcode -> you sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!";
    readonly "4002": "Decode Error -> you sent an invalid payload to discord. Don't do that!";
    readonly "4003": "Not Authenticated -> you sent discord a payload prior to identifying";
    readonly "4004": "Authentication Failed -> the account token sent with your identify payload is incorrect";
    readonly "4005": "Already Authenticated -> you sent more than one identify payload. Don't do that!";
    readonly "4007": "Invalid Seq -> the seq sent when resuming the session was invalid. Reconnect and start a new session";
    readonly "4008": "Rate Limited -> woah nelly! you're sending payloads to discord too quickly. slow it down!";
    readonly "4009": "Session Timeout -> your session timed out. Reconnect and start a new one";
    readonly "4010": "Invalid Shard -> sent discord an invalid shard when identifying";
    readonly "4011": "Sharding Required -> the session would have handled too many guilds - you are required to shard your connection in order to connect";
    readonly "4012": "Invalid API Version -> you sent an invalid version for the gateway";
    readonly "4013": "Invalid Intent(s) -> you sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value";
    readonly "4014": "Disallowed Intent(s) -> you sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for";
};
//# sourceMappingURL=constants.d.ts.map