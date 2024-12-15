import { Schema, MapSchema, type } from "@colyseus/schema";

export default class PlayerLobby extends Schema {
    @type("string") name: string;
    @type("boolean") isReady: boolean;
    @type("string") color: string;

    constructor(id: string, name: string) {
        super();
        this.name = name;
        this.isReady = false;
        this.color = "";
    }

    public SetColor(color : string)
    {
        this.color = color;
    }
}
