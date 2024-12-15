import { Room, Client } from "colyseus";
import http from "http";
import { Schema, MapSchema, type } from "@colyseus/schema";
import Player from "./Player";

export class RoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}

export class MyRoom extends Room<RoomState> {
    static async onAuth(token: string, request: http.IncomingMessage) { }

    // Set the initial state when the room is created
    onCreate(options: any) {
        options.maxClients = 5;
        
        this.setState(new RoomState());

        // Listen for client messages
        this.onMessage("chat", (client, message) => {
            console.log(`Received message from ${client.sessionId}: ${message}`);

            // Broadcast the message to all clients
            this.broadcast("chat", `${client.sessionId}: ${message}`);
        });
    }

    // Handle when a client joins the room
    onJoin(client: Client, options: any) {
        console.log(`${client.sessionId} joined the room`);
        const player = new Player(client.sessionId, options.playerName);
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
