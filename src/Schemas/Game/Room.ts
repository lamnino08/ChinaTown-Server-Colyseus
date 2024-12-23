import { Room, Client } from "colyseus";
import http from "http";

import { RoomState } from "@Schemas/Game/RoomState";
import GameHandle from "@Handle/GameHandle";
import ActionHandle from "@Handle/ActionHandel";
import { MessageClientToServerGame } from "@Enum/Client to Server/MessageClientToServerGame";

export class MyRoom extends Room<RoomState> {
    static async onAuth(token: string, request: http.IncomingMessage) { }

    gameHandel: GameHandle | undefined;
    actionHandle: ActionHandle | undefined;

    // Set the initial state when the room is created
    onCreate(options: any) {
        this.setState(new RoomState());
        this.gameHandel = new GameHandle(this);
        this.actionHandle = new ActionHandle(this);
    }

    // Handle when a client joins the room
    onJoin(client: Client, options: any) {
        console.log(`${client.sessionId} join the room`);

        const playerName : string = options.playerName;
        const color : number = options.color;
        this.state.AddPlayer(client.sessionId, playerName, color);
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
