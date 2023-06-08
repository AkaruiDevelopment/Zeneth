import { Client, GatewayEventNames, GatewayInteractionCreateData } from "../../index.js";
import { Interaction } from "../../classes/index.js"

export default function InteractionCreate(data: GatewayInteractionCreateData, client: Client) {
    const interaction = new Interaction(data.d, client);

    return client.emit(GatewayEventNames.InteractionCreate, interaction);
}