import { Schema, type } from "@colyseus/schema";

export default class PlayerLobby extends Schema {
    @type("string") name: string;
    @type("boolean") isReady: boolean;
    @type("int32") color: number;

    constructor(color: number, name: string) {
        super();
        this.name = name;
        this.isReady = false;
        this.color = color;
    }

    public Ready(isReady : boolean)
    {
        this.isReady = true;
    }
}
