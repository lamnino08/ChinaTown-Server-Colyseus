import { Server, LobbyRoom, matchMaker } from "colyseus";
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./Schemas/Room";
import { Lobby } from "./Schemas/Lobby";

const port = 2567;
const app = express();

app.use(express.static(__dirname + "/public"));

const server = createServer(app);

const gameServer = new Server({
  server,
});

gameServer.define("room", MyRoom);

gameServer.define("lobby", Lobby);

app.get("/rooms", async (req, res) => {
    try {
      // Query the matchmaker for all available lobby
      const rooms = await matchMaker.query({ name: "lobby"});
      res.json(rooms.map(room => ({
        roomId: room.roomId,
        clients: room.clients,
      })));
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve rooms"});
    }
  });

gameServer.listen(port);

console.log(`Colyseus server is running on ws://localhost:${port}`);
