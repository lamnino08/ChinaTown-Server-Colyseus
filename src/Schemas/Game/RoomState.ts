import { Schema, MapSchema, type } from "@colyseus/schema";
import { GamePhase } from "@Enum/GamePhase";
import Player from "@Schemas/Game/Player";
import { Util } from '@Util/Util'

export class RoomState extends Schema {
    @type( "string" ) gamePhare: string = GamePhase.WAITING;
    @type({ map: Player }) players = new MapSchema<Player>();

    private tile: number[] = Array(85).fill(0); 
    private store: number[] = Array(12).fill(0); 
    public year: number = 0;

    constructor() {
        super();
        for (let i = 0; i < 12; i++) {
            this.store[i] = Math.floor(i / 3) + 6; // Initialize store card values
        }
    }
 
    public AddPlayer(sessionId : string, playerName : string, color : number)
    {
        const index = this.players.size;
        const player : Player = new Player(sessionId, playerName, color, index);
        this.players.set(sessionId, player);        
    }

    public distributeTileCard(): number[][] {
        // if (numberPlayer < 3 || numberPlayer > 5) {
            // return null; 
        // }
        const numberPlayer = this.players.size;

        const numberTile = Util.numberTileCard(this.year, numberPlayer);
        const tiles: number[][] = [];

        for (let playerIndex = 1; playerIndex <= numberPlayer; playerIndex++) {
            const tilesOfPlayer: number[] = [];
            const random = new Random();

            for (let i = 0; i < numberTile; i++) {
                let randomIndex: number;
                do {
                    randomIndex = random.nextInt(0, 85);
                } while (this.tile[randomIndex] !== 0);

                tilesOfPlayer.push(randomIndex);
                this.tile[randomIndex] = playerIndex;
            }

            tiles.push(tilesOfPlayer);
        }

        return tiles;
    }

    public distributeStoreCard(): number[][] {
        // if (numberPlayer < 3 || numberPlayer > 5) {
        //     numberPlayer = 3; // Default to 3 players if invalid count
        // }
        const numberPlayer = this.players.size;

        const numberStoreCard = Util.numberStoreCard(this.year, numberPlayer);
        const storeCards: number[][] = [];

        for (let playerIndex = 0; playerIndex < numberPlayer; playerIndex++) {
            const storeCardsOfPlayer: number[] = [];
            const random = new Random();

            for (let i = 0; i < numberStoreCard; i++) {
                let randomIndex: number;
                do {
                    randomIndex = random.nextInt(0, 12);
                } while (this.store[randomIndex] === 0);

                storeCardsOfPlayer.push(randomIndex);
                this.store[randomIndex]--;
            }

            storeCards.push(storeCardsOfPlayer);
        }

        return storeCards;
    }

    public newYear(): number[][] | null {
        this.year++;
        return this.distributeTileCard();
    }

    public receiveResultChoseTileCard(tileReturn: { tile: number }[]): void {
        for (const tileCardReturn of tileReturn) {
            this.tile[tileCardReturn.tile] = 0; // Reset tile to 0 (unoccupied)
        }
    }
}

// Utility class for random number generation
class Random {
    public nextInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
