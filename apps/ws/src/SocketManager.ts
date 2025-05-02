import { randomUUID } from 'crypto';
import { WebSocket } from 'ws';
import { userJwtClaims } from './auth';

export class User {
  public socket: WebSocket;
  public id: string;
  public userId: string;
  public name: string;
  public isGuest?: boolean;

  constructor(socket: WebSocket, userJwtClaims: userJwtClaims) {
    this.socket = socket;
    this.userId = userJwtClaims.userId;
    this.id = randomUUID();
    this.name = userJwtClaims.name;
    this.isGuest = userJwtClaims.isGuest;
  }
}

class SocketManager {
  private static instance: SocketManager;
  private interestedSockets: Map<string, User[]>;
  private userRoomMappping: Map<string, string>;

  private constructor() {
    this.interestedSockets = new Map<string, User[]>();
    this.userRoomMappping = new Map<string, string>();
  }

  static getInstance() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }

    SocketManager.instance = new SocketManager();
    return SocketManager.instance;
  }

  addUser(user: User, roomId: string) {
    this.interestedSockets.set(roomId, [
      ...(this.interestedSockets.get(roomId) || []),
      user,
    ]);
    this.userRoomMappping.set(user.userId, roomId);
  }
  getUserRoom(userId: string): string | null {
    return this.userRoomMappping.get(userId) || null;
  }

  broadcast(roomId: string, message: string) {
    const users = this.interestedSockets.get(roomId);
    if (!users) {
      console.error('No users in room?');
      return;
    }

    users.forEach((user) => {
      user.socket.send(message);
    });
  }

  removeUser(user: User) {
    const roomId = this.userRoomMappping.get(user.userId);
    if (!roomId) {
      console.error('User was not interested in any room?');
      return;
    }
    const room = this.interestedSockets.get(roomId) || []
    const remainingUsers = room.filter(u =>
      u.userId !== user.userId
    )
    this.interestedSockets.set(
      roomId,
      remainingUsers
    );
    if (this.interestedSockets.get(roomId)?.length === 0) {
      this.interestedSockets.delete(roomId);
    }
    this.userRoomMappping.delete(user.userId);
  }

  handleMessage(user: User, payload: { message: string }) {
    const roomId = this.userRoomMappping.get(user.userId);
    if (!roomId) {
      console.error('User was not interested in any room?');
      return;
    }

    const chatMessage = JSON.stringify({
      type: 'chat',
      payload: {
        message: payload.message,
        sender: user.name,
      }
    });

    this.broadcast(roomId, chatMessage);
  }

}

export const socketManager = SocketManager.getInstance()
