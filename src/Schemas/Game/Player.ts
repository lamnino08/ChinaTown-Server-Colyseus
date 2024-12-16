import { Schema, type, ArraySchema } from "@colyseus/schema";

export default class player extends Schema {
    @type("string") sessionId: string;
    @type("string") name: string;
    @type("boolean") isReady: boolean;
    @type("int32") color: number;
    @type([ "number" ]) tile: ArraySchema<number>; 
    @type([ "number" ]) store: ArraySchema<number>; 
    @type("int32") money: number; 
    @type("int32") index: number; 

    constructor(sessionId: string, name: string, color : number, index : number) {
        super();
        this.sessionId = sessionId;
        this.name = name;
        this.isReady = false;
        this.color = color;
        this.tile = new ArraySchema<number>(); 
        this.store = new ArraySchema<number>();
        this.money = 0; 
        this.index = index;
    }

    public Ready(isReady: boolean) {
        this.isReady = isReady;
    }

    public AddTile(tileId: number) {
        this.tile.push(tileId); // Add a tile to the player's array
    }

    public RemoveTile(tileId: number) {
        const index = this.tile.indexOf(tileId);
        if (index > -1) {
            this.tile.splice(index, 1); // Remove the tile if it exists
        }
    }

    public AddStoreCard(storeCardId: number) {
        this.store.push(storeCardId); // Add a store card to the player's array
    }

    public RemoveStoreCard(storeCardId: number) {
        const index = this.store.indexOf(storeCardId);
        if (index > -1) {
            this.store.splice(index, 1); // Remove the store card if it exists
        }
    }

    public UpdateMoney(amount: number) {
        this.money += amount; // Update the player's money
    }
}
