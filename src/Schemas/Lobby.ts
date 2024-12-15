import { Client, Room } from "colyseus";
import http from "http";
import PlayerLobby from "./PlayerLobby";
import LobbyState from "./LobbyState";
import LobbyHandle from "../Handle/LobbyHandle";


export class Lobby extends Room<LobbyState> {
    static async onAuth(token: string, request: http.IncomingMessage) { }

    lobbyHandel: LobbyHandle | undefined;

    onCreate(options: any) {
        this.setState(new LobbyState());

        this.lobbyHandel = new LobbyHandle(this);
        this.lobbyHandel.RegisHandle();
    }

    // Handle when a client joins the room
    onJoin(client: Client, options: any) {
        console.log(`${client.sessionId} joined the room`);
        const player = new PlayerLobby(client.sessionId, options.playerName);

        this.state.players.set(client.sessionId, player);
    }

    // Handle when a client leaves the room
    onLeave(client: Client, consented: boolean) {
        console.log(`${client.sessionId} left the room`);
    }

    // Handle when the room is disposed
    onDispose() {
        console.log("Room disposed");
    }

    onUncaughtException(err: Error, methodName: string) {
        console.error("An error ocurred in", methodName, ":", err);
        err.message // original error message
    }
}
