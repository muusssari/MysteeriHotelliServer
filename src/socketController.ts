


import { Lobby } from "./lobby";
import { Server, Socket } from "socket.io";


export class SocketListener {
  private _serverSocket: Server;
  private _lobbyList: Lobby[] = [];
  private _mainRoomName: string = "mainRoom"
 
  constructor(expressServer: any) {
    this._serverSocket = new Server(expressServer, {});
    this.createSocketListener();
  }
  
  private createSocketListener() {
    this._serverSocket.on('connection', async (socket: Socket) => {
      console.log('a user connected');
      // show lobby list?
      socket.join(this._mainRoomName); // user connect main room
      this._serverSocket.allSockets().then(allSockets => {
        this._serverSocket.to(this._mainRoomName).emit("userCount", allSockets.size);
      });

      socket.on('disconnecting', () => {
        // Inform user is disconnecting
        console.log("disconnecting")
      })
      socket.on('disconnect', async () => {
        // check all lobbies if socket is in one
        this._serverSocket.allSockets().then(allSockets => {
          this._serverSocket.to(this._mainRoomName).emit("userCount", allSockets.size);
        });
        console.log('user disconnected');
      });

      socket.on('createLobby', (lobbyData: lobbyCreationData, callback) => {
        console.log(lobbyData.name)
        try {
          const lobby = new Lobby(lobbyData.name, this._serverSocket, socket);
          this._lobbyList.push(lobby);
          callback({success: true, guid: lobby.lobbyGuid})
        } catch (error) {
          callback({success: false, error: "failed to create lobby: " + error})
        }
      });

      socket.on('joinLobby', (lobbyGuid: string, callback) => {
        // join lobby
        try {
          const lobby = this._lobbyList.find((lobby) => lobby.lobbyGuid === lobbyGuid);
          if(lobby) {
            lobby.addSocketToLobby(socket);
            callback({success: true, guid: lobby.lobbyGuid})
          }else {
            callback({success: false, error: "failed to join: not found"})
          }
        } catch (error) {
          callback({success: false, error: "failed to join: " + error})
        }
      });
    });
  }

  // maybe use auth to use this server
  /*io.use((socket, next) => {
    var handshakeData = socket.request;
    console.log("middleware:", handshakeData._query['foo']);
    next();
  });*/

  // Remove users if they are disconnected

  
}


interface lobbyCreationData {
  name: string;
}