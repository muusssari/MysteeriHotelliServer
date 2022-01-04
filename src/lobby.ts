import { Server, Socket } from "socket.io";
import { generateRandom5LengthGuid } from "./Utils";


export class Lobby {
  private _name: string;
  private _io: Server;
  private _lobbyUsers: Socket[];
  private _admin: Socket;
  private _lobbyGuid: string = generateRandom5LengthGuid();
  
  get lobbyGuid() { return this._lobbyGuid }
 
  constructor(name: string, io: Server, creatorUser: Socket) {
    this._name = name;
    this._io = io;
    this._admin = creatorUser;
    this._lobbyUsers.push(creatorUser);
  }

  private adminListeners() {
    // add listeners
    // kick user
    // change game?
  }

  public addSocketToLobby(socket: Socket) {
    this._lobbyUsers.push(socket);
    // Remove socket listeners
    // Add socket to lobby list
    // Update socket
    // pass lobby listeners to socket
  }

  public removeSocketFromLobby(socket: Socket) {
    this._lobbyUsers.filter((s: Socket) => s.id === socket.id);
    //remove listeners
  }

  // Remove users if they are disconnected
  // Add admin own commands
  // if Creator disconnect (chose new one / destroy lobby)

  
}