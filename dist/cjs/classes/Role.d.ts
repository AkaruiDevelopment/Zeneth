import Client from "../client/index.js";
import { RawRoleData, RawRoleTagsData } from "../typings/interface.js";
import { Camelize } from "../typings/types.js";
export default class Role {
    #private;
    color: number;
    hoist: boolean;
    icon: bigint | undefined;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: string;
    position: number;
    tags: Camelize<RawRoleTagsData | undefined>[];
    unicodeEmoji: string | undefined;
    constructor(data: RawRoleData, client: Client);
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=Role.d.ts.map