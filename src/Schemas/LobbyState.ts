import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";
import PlayerLobby from "./PlayerLobby";

export default class LobbyState extends Schema {
    // @type([ "int32" ]) colors : ArraySchema<number> = new ArraySchema<number>();
    @type({map: "string"}) colors = new MapSchema<string>();

    @type({ map: PlayerLobby }) players = new MapSchema<PlayerLobby>();

    constructor() {
        super();
        this.colors.set("0", "red");
        this.colors.set("1", "yellow");
        this.colors.set("2", "blue");
        this.colors.set("3", "green");
        this.colors.set("4", "black");
    }

    public RegisterColorToPlayer(color : string, sessionId : string): void 
    {
        if (this.colors.has(color))
        {
            this.players.get(sessionId)?.SetColor(color);
            this.colors.delete(color);
            console.log("remove color"+color);
        }
    }
}
