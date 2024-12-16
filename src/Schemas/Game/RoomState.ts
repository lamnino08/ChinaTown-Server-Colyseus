import { Schema, MapSchema, type } from "@colyseus/schema";
import Player from "@Schemas/Game/Player";

export class RoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}