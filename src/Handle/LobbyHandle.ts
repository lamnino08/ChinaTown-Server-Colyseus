import { Client } from "colyseus";
import { Lobby } from "../Schemas/Lobby";
import { MessageClientToServer } from "../Enum/MessageClientToServer";
import { MessageServerToClient } from "../Enum/MessageServerToClient";

export default class LobbyHandle {
    lobby: Lobby;

    constructor(lobby: Lobby) {
        this.lobby = lobby;
    }

    public RegisHandle() {
        // Đăng ký handler cho sự kiện "select_color"
        this.lobby.onMessage(MessageClientToServer.SelectColor, this.handleSelectColor.bind(this));

        // Đăng ký thêm các sự kiện khác nếu cần
        this.lobby.onMessage("another_event", this.handleAnotherEvent.bind(this));
    }

    private handleSelectColor(client: Client, message: { color: string }) {
        console.log(`Client ${client.sessionId} selected color: ${message.color}`);

        if (this.lobby.state.colors.has(message.color)) {
            this.lobby.state.RegisterColorToPlayer(message.color, client.sessionId);
            // Broadcast đến tất cả client
            this.lobby.broadcast(MessageServerToClient.PlayerChooseColor, {
                sessionId: client.sessionId,
                color: message.color,
            });
        } else {
            // Gửi lỗi nếu màu không hợp lệ
            client.send("error", { message: "Invalid color selected!" });
        }
    }

    private handleAnotherEvent(client: Client, message: any) {
        console.log(`Received another_event from ${client.sessionId}`, message);
    }
}
