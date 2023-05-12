import User from '../../classes/User.js';
import { GatewayEventNames } from '../../typings/enums.js';
import { convertToCamelCase } from '../../utils/helpers.js';
export default async function Ready(data, client) {
    const readyData = {
        user: new User(data.d.user, client),
        guilds: data.d.guilds,
        resumeGatewayUrl: data.d.resume_gateway_url,
        shard: data.d.shard,
        sessionId: data.d.session_id,
        application: (convertToCamelCase(data.d.application))
    };
    client.readyData = readyData;
    for (const f of client.__on__[GatewayEventNames.Ready] ?? []) {
        await f(client);
    }
}
//# sourceMappingURL=readyManager.js.map