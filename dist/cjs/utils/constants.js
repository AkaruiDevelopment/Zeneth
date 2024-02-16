"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCodeMessages = exports.canReconnectOnCodes = void 0;
exports.canReconnectOnCodes = {
    4000: true,
    4001: true,
    4002: true,
    4003: true,
    4004: false,
    4005: true,
    4007: true,
    4008: true,
    4009: true,
    4010: false,
    4011: false,
    4012: false,
    4013: false,
    4014: false,
};
exports.errorCodeMessages = {
    "4000": "Unknown Error -> an unknown error occurred",
    "4001": "Unknown Opcode -> you sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!",
    "4002": "Decode Error -> you sent an invalid payload to discord. Don't do that!",
    "4003": "Not Authenticated -> you sent discord a payload prior to identifying",
    "4004": "Authentication Failed -> the account token sent with your identify payload is incorrect",
    "4005": "Already Authenticated -> you sent more than one identify payload. Don't do that!",
    "4007": "Invalid Seq -> the seq sent when resuming the session was invalid. Reconnect and start a new session",
    "4008": "Rate Limited -> woah nelly! you're sending payloads to discord too quickly. slow it down!",
    "4009": "Session Timeout -> your session timed out. Reconnect and start a new one",
    "4010": "Invalid Shard -> sent discord an invalid shard when identifying",
    "4011": "Sharding Required -> the session would have handled too many guilds - you are required to shard your connection in order to connect",
    "4012": "Invalid API Version -> you sent an invalid version for the gateway",
    "4013": "Invalid Intent(s) -> you sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value",
    "4014": "Disallowed Intent(s) -> you sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for",
};
//# sourceMappingURL=constants.js.map