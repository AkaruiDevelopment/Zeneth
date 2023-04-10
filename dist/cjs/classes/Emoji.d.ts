import { snowflake, Snowflake } from "../typings/types.js";
import { CreateGuildEmojiPayload, RawEmojiData } from "../typings/interface.js";
import User from "./User.js";
import Client from "../client/index.js";
export default class Emoji {
    #private;
    id: Snowflake | null;
    name: string | null;
    roles?: Snowflake[];
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
    guildId?: Snowflake;
    __priority: number;
    constructor(data: RawEmojiData, client: Client, guild?: snowflake);
    get [Symbol.toStringTag](): string | bigint | null;
    get parsedSnowflake(): {
        timestamp: number;
        date: Date;
        workerId: bigint;
        processId: bigint;
        increment: bigint;
        binary: string;
    } | null;
    toString(): string | bigint | null;
    toJSON(): {
        id: bigint | null;
        name: string | null;
        roles: bigint[] | undefined;
        user: User | undefined;
        require_colons: boolean | undefined;
        managed: boolean | undefined;
        animated: boolean | undefined;
        available: boolean | undefined;
    };
    fetch(): Promise<Emoji | null>;
    update(data: RawEmojiData): void;
    modify(data: Omit<CreateGuildEmojiPayload, 'image'>): Promise<Emoji | null>;
    delete(): Promise<boolean | null>;
}
//# sourceMappingURL=Emoji.d.ts.map