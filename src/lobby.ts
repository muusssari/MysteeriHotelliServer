import { Server, Socket } from "socket.io";
import { generateRandom5LengthGuid } from "./Utils";


export class Lobby {
  private _name: string;
  private _serverSocket: Server;
  private _lobbyUsers: Socket[];
  private _admin: Socket;
  private _lobbyGuid: string = generateRandom5LengthGuid();
  
  get lobbyGuid() { return this._lobbyGuid }
 
  constructor(name: string, io: Server, creatorUser: Socket) {
    this._name = name;
    this._serverSocket = io;
    this._admin = creatorUser;
    this._admin.join(this._lobbyGuid);
    //this._lobbyUsers.push(creatorUser);
  }

  private adminListeners() {
    // add listeners
    // kick user
    // change game?
  }

  public async addSocketToLobby(socket: Socket) {
    //this._lobbyUsers.push(socket);
    this._admin.emit("admin info")
    socket.join(this._lobbyGuid);
    const a = (await this._serverSocket.sockets.in(this._lobbyGuid).allSockets()).size;
    this._serverSocket.sockets.in(this._lobbyGuid).emit('userJoined', a);
    this._serverSocket.to(this._lobbyGuid).emit('user has joined')
    // Remove socket listeners
    // Add socket to lobby list
    // Update socket
    // pass lobby listeners to socket
  }

  public removeSocketFromLobby(socket: Socket) {
    //this._lobbyUsers.filter((s: Socket) => s.id === socket.id);
    //remove listeners
  }

  // Remove users if they are disconnected
  // Add admin own commands
  // if Creator disconnect (chose new one / destroy lobby)

  
}