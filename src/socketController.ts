


import { Lobby } from "./lobby";
import { Server } from "socket.io";


export class SocketListener {
  private _socketServer;
  private _lobbyList: Lobby[] = [];
 
  constructor(expressServer: any) {
    this._socketServer = new Server(expressServer, {});
    this.createSocketListener();
  }
  
  private createSocketListener() {
    this._socketServer.on('connection', (socket) => {
      console.log('a user connected');
      // show lobby list?
      socket.on('disconnect', () => {
        // check all lobbies if socket is in one
        console.log('user disconnected');
      });
      socket.on('createLobby', (lobbyData) => {
        console.log("createLobby");
        const lobby = new Lobby(lobbyData.name, this._socketServer, socket);
        this._lobbyList.push(lobby);
        console.log(this._lobbyList);
      });
      socket.on('joinLobby', (lobbyGuid: string) => {
        // join lobby
        const lobby = this._lobbyList.find((lobby) => lobby.lobbyGuid === lobbyGuid);
        if(lobby) lobby.addSocketToLobby(socket);
        else console.log("not found")
      });
    });
  }

  // Remove users if they are disconnected

  
}