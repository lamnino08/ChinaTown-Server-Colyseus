import { Client } from "colyseus";
import { Lobby } from "../Schemas/Lobby/Lobby";
import { matchMaker } from "colyseus";
import { MessageServerToClient } from "../Enum/Server To Client/MessageServerToClientLobby";
import { MessageClientToServerLobby } from "../Enum/Client to Server/MessageClientToServerLobby"
import { MapSchema } from "@colyseus/schema";
import PlayerLobby from "@Schemas/Lobby/PlayerLobby";

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
            var isAllReady : boolean = this.lobby.state.PlayerReady(message.color, client.sessionId);

            // Response
            this.lobby.broadcast(MessageServerToClient.PLAYER_CHOOSE_COLOR, {
                sessionId: client.sessionId,
                color: message.color,
                isAllReady: isAllReady
            });
        } else {
            // Erorr
            client.send("MessageServerToClient.ERROR", { message: "Bad Server" });
        }
    }

    private handle_StartGame(client: Client, message: any) {
        console.log(`On message start game`);
        if (this.lobby.state.IsAllReady())
        {
            this.createGameRoom();
        } else
        {
            client.send(MessageServerToClient.ERROR, { message: "Not all players are ready." });
        }
    }

    async createGameRoom() {
        const room = await matchMaker.createRoom("room", {});

        this.lobby.broadcast(MessageServerToClient.GAME_START, { roomId: room.roomId });

        this.lobby.disconnect();
    }
}
