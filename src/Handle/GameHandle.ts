import { Client } from "colyseus";
import { MessageClientToServerGame } from "../Enum/Client to Server/MessageClientToServerGame"
import { MessageServerToClientGame } from "../Enum/Server To Client/MessageServerToClientGame"
import { MyRoom } from "@Schemas/Game/Room";
import CardDealResult from "@models/CardDealResult";

export default class GameHandle {
    room: MyRoom;

    constructor(room: MyRoom) {
        this.room = room;
        this.RegisHandle(MessageClientToServerGame);
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
        console.log(`Start game`);

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
        console.log(`Player sessionId ${client.sessionId} return cards`);
        
        const { cards } = message;

        if (Array.isArray(cards)) {
            const returnCards : CardDealResult[] = cards.map((card) => {
                console.log(`${card.tile}: ${card.isChossen}`);
                return new CardDealResult(card.tile, card.isChossen);
            })

            const isAllReturnCard : Boolean = this.room.state.receiveResultChoseTileCard(client.sessionId, returnCards);

            const ChossenCard : number[] = returnCards
            .filter((card) => card.isChossen == true)
            .map((card) => card.tile);

            // this.room.send(client, MessageServerToClientGame.PLAYER_DONE_DEAL_TILE_CARD );
            client.send(MessageServerToClientGame.PLAYER_DONE_DEAL_TILE_CARD);

            if (isAllReturnCard)
            {
                console.log("On all player done deal tile card");
                const liststoreCards : number[][] = this.room.state.distributeStoreCard();
                this.room.broadcast(MessageServerToClientGame.ALL_DONE_DEAL_TILE_CARD, {
                    liststoreCards: liststoreCards
                });
            }
        } else {
            console.log("Invalid message format: 'cards' is not an array.");
        }
    }


}
