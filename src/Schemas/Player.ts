import { Schema, MapSchema, type } from "@colyseus/schema";

export default class Player extends Schema {
    @type("string") sessionId: string;
    @type("string") name: string;

    constructor(id: string, name: string) {
        super();
        this.sessionId = id;
        this.name = name ? name : "lamnino";
    }
}
