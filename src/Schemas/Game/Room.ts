import { Room, Client } from "colyseus";
import http from "http";

import { RoomState } from "@Schemas/Game/RoomState";

export class MyRoom extends Room<RoomState> {
    static async onAuth(token: string, request: http.IncomingMessage) { }

    // Set the initial state when the room is created
    onCreate(options: any) {
        options.maxClients = 5;
        
        this.setState(new RoomState());

        if (options.players) {
            for (const player of options.players) {
                // this.state.players.set(player.name, {
                //     name: player.name,
                //     color: player.color,
                // });
            }
        }
    }

    // Handle when a client joins the room
    onJoin(client: Client, options: any) {
        console.log(`${client.sessionId} joined the room`);
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
