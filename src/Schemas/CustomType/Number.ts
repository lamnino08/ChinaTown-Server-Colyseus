import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";
export default class Number extends Schema {
    @type("number") value: number;

    constructor(code: number) {
        super();
        this.value = code;
    }
}