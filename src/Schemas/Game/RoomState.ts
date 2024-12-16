import { Schema, MapSchema, type } from "@colyseus/schema";
import Player from "@Schemas/Game/Player";

export class RoomState extends Schema {
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

    public distributeTileCard(numberPlayer: number): number[][] | null {
        // if (numberPlayer < 3 || numberPlayer > 5) {
            // return null; 
        // }

        const numberTile = this.getNumberTileCard(this.year, numberPlayer);
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

    public distributeStoreCard(numberPlayer: number): number[][] {
        if (numberPlayer < 3 || numberPlayer > 5) {
            numberPlayer = 3; // Default to 3 players if invalid count
        }

        const numberStoreCard = this.getNumberStoreCard(this.year, numberPlayer);
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

    public newYear(numberPlayer: number): number[][] | null {
        this.year++;
        return this.distributeTileCard(numberPlayer);
    }

    public receiveResultChoseTileCard(tileReturn: { tile: number }[]): void {
        for (const tileCardReturn of tileReturn) {
            this.tile[tileCardReturn.tile] = 0; // Reset tile to 0 (unoccupied)
        }
    }

    // Helper functions
    private getNumberTileCard(year: number, numberPlayer: number): number {
        // Example logic for determining number of tiles per player
        return year * 5 + 10 - numberPlayer;
    }

    private getNumberStoreCard(year: number, numberPlayer: number): number {
        // Example logic for determining number of store cards per player
        return year * 2 + 3;
    }
}

// Utility class for random number generation
class Random {
    public nextInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
