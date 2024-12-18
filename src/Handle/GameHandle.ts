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
    

    private handle_NewYear(client: Client, message: { color: number }) : void {
        const listTileCards : number[][] = this.room.state.distributeTileCard();

        const clients: Client[] = Array.from(this.room.clients);

        clients.forEach((client, index) => {
            const cards = listTileCards[index];
            if (client) {
                client.send(MessageServerToClientGame.TILE_CARDS, { cards: cards });
            }
        });
    }

    private handle_ConfirmTileCard(client: Client, message: any)
    {
        const { cards } = message;

        if (Array.isArray(cards)) {
            cards.forEach(card => {
                const tile : number = card.tile;
                const isChosen : boolean = card.isChosse;
            });
        } else {
            console.log("Invalid message format: 'cards' is not an array.");
        }
    }
}
