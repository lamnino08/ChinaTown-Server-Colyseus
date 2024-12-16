import { Client } from "colyseus";
import { Lobby } from "../Schemas/Lobby";
import { MessageClientToServer } from "../Enum/MessageClientToServer";
import { MessageServerToClient } from "../Enum/MessageServerToClientLobby";
import { MessageClientToServerLobby } from "../Enum/MessageClientToServerLobby"

export default class LobbyHandle {
    lobby: Lobby;

    constructor(lobby: Lobby) {
        this.lobby = lobby;
    }

    public RegisHandle(messageClientToServerLobby: typeof MessageClientToServerLobby) {
        const messageEntries = Object.entries(messageClientToServerLobby);
    
        messageEntries.forEach(([key, value]) => {
            const handlerName = `handle_${key}`; 
    
            if (typeof (this as any)[handlerName] === "function") {
                this.lobby.onMessage(value as string, (this as any)[handlerName].bind(this));
                console.log(`Registered handler for: ${value} -> ${handlerName}`);
            } else {
                console.warn(`Handler ${handlerName} does not exist for message type: ${value}`);
            }
        });
    }
    

    private handle_PlayerSelectColor(client: Client, message: { color: number }) {
        console.log(`Client ${client.sessionId} selected color: ${message.color}`);

        if (this.lobby.state.colors[message.color]) {
            // Handle back end
            this.lobby.state.PlayerReady(message.color, client.sessionId);

            // Response
            this.lobby.broadcast(MessageServerToClient.PLAYER_CHOOSE_COLOR, {
                sessionId: client.sessionId,
                color: message.color,
            });
        } else {
            // Erorr
            client.send("MessageServerToClient.ERROR", { message: "Bad Server" });
        }
    }

    private handleAnotherEvent(client: Client, message: any) {
        console.log(`Received another_event from ${client.sessionId}`, message);
    }
}
