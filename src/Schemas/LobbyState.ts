import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";
import PlayerLobby from "./PlayerLobby";

export default class LobbyState extends Schema {
    @type([ "boolean" ]) colors = new ArraySchema<boolean>();

    @type({ map: PlayerLobby }) players = new MapSchema<PlayerLobby>();

    constructor() {
        super();
        this.colors.push(true, true, true, true, true);
    }

    public PlayerLeft(sessionId : string)
    {
        const player = this.players.get(sessionId);

        if (player) {
            if (player.color !== -1) {
                this.colors[player.color] = true; 
            }

            this.players.delete(sessionId);
        }
    }

    public PlayerReady(color : number, sessionId : string): void 
    {

        if (this.colors[color]) { // Check if the color is available
            const player = this.players.get(sessionId);
            if (player) {
                player.Ready(color); 
                this.colors[color] = false; 
            }
        } else {
            console.error(`Color ${color} is not available.`);
        }
    }
}
