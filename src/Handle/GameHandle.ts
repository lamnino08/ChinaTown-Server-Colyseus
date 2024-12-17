import { Client } from "colyseus";
import { MessageClientToServerGame } from "../Enum/Client to Server/MessageClientToServerGame"
import { MessageServerToClientGame } from "../Enum/Server To Client/MessageServerToClientGame"
import { MyRoom } from "@Schemas/Game/Room";

export default class GameHandle {
    room: MyRoom;

    constructor(room: MyRoom) {
        this.room = room;
    }

    public RegisHandle(messageClientToServerGame: typeof MessageClientToServerGame) {
        const messageEntries = Object.entries(messageClientToServerGame);
    
        messageEntries.forEach(([key, value]) => {
            const handlerName = `handle_${key}`; 
    
            if (typeof (this as any)[handlerName] === "function") {
                this.room.onMessage(value as string, (this as any)[handlerName].bind(this));
                console.log(`Registered handler for: ${value} -> ${handlerName}`);
            } else {
                console.warn(`Handler ${handlerName} does not exist for message type: ${value}`);
            }
        });
    }
    

    private handle_NewYear(client: Client, message: { color: number }) {
        // console.log(`Client ${client.sessionId} selected color: ${message.color}`);
        const listTileCards : number[][] = this.room.state.distributeTileCard();

        const clients: Client[] = Array.from(this.room.clients);

        listTileCards.forEach((tileCards, index) => {
            const targetClient = clients[index];
            if (targetClient) {
                targetClient.send(MessageServerToClientGame.TILE_CARDS, { cards: tileCards });
            }
        });
    }
}
