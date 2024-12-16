import { Schema, MapSchema, type } from "@colyseus/schema";

export default class PlayerLobby extends Schema {
    @type("string") name: string;
    @type("boolean") isReady: boolean;
    @type("int32") color: number;

    constructor(id: string, name: string) {
        super();
        this.name = name;
        this.isReady = false;
        this.color = -1;
    }

    public Ready(color : number)
    {
        this.isReady = true;
        this.color = color;
    }
}
