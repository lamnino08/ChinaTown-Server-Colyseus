import { Client } from "colyseus";
import { MyRoom } from "@Schemas/Game/Room";
import { MessageClientToServerAction } from "@Enum/Client to Server/MessageClientToServerAction";
import { MessageServerToClientAction } from "@Enum/Server To Client/MessageServerToClientAction";

export default class ActionHandle {
    room: MyRoom;

    constructor(room: MyRoom) {
        this.room = room;
        this.RegisHandle(MessageClientToServerAction);
    }

    public RegisHandle(messageClientToServerAction: typeof MessageClientToServerAction) {
        const messageEntries = Object.entries(messageClientToServerAction);

        messageEntries.forEach(([key, value]) => {
            const handlerName = `handle_${key}`;

            if (typeof (this as any)[handlerName] === "function") {
                this.room.onMessage(value as string, (this as any)[handlerName].bind(this));
                console.log(`Registered handler for: ${value} -> ${handlerName}`);
            } else {
                console.warn(`Handler ${handlerName} does not exist for message type: ${value}`);
            }
        });
    }

    private handle_BROADCAST(client: Client, message: {
        id: string,
        args: object
    }): void {
        console.log(`broadcast`);
        console.log(`Args: ${JSON.stringify(message.args, null, 2)}`);
        this.room.broadcast(MessageServerToClientAction.Action, {
            sessionId: client.sessionId,
            id: message.id
        });
    }

    public ServerSpawn(sessionId: string, nameGameobject: string)
    {
        this.room.broadcast(MessageServerToClientAction.Spawn, {
            sessionId,
            name: nameGameobject
        })
    }
}
