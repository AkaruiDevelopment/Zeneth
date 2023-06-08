import { GatewayEventNames } from "../../index.js";
import { Interaction } from "../../classes/index.js";
export default function InteractionCreate(data, client) {
    const interaction = new Interaction(data.d, client);
    return client.emit(GatewayEventNames.InteractionCreate, interaction);
}
//# sourceMappingURL=interactionCreateManager.js.map