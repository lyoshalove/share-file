import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5000, { cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;
  rooms: Array<{ senderId: string; roomId: string }>;

  constructor() {
    this.rooms = [];
  }

  @SubscribeMessage('sender-join')
  handleSenderJoin(@MessageBody() data, @ConnectedSocket() client: Socket) {
    this.rooms.push({
      senderId: client.id,
      roomId: data.id,
    });
    client.join(data.id);
  }

  @SubscribeMessage('client-leave')
  handleDisconnectClient(@ConnectedSocket() client: Socket) {
    this.rooms = this.rooms.filter((room) => room.senderId !== client.id);
  }

  @SubscribeMessage('receiver-join')
  handleReceiverJoin(@MessageBody() data, @ConnectedSocket() client: Socket) {
    if (this.rooms.some((room) => room.roomId === data.id)) {
      client.join(data.id);
      this.connectedToRoom(client);
    } else {
      this.roomNotExist(client);
    }
  }

  @SubscribeMessage('send-file')
  handleSendFile(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.in(data.id).emit('file', {
      data: data.data,
      fileName: data.fileName,
    });
  }

  connectedToRoom(client: Socket) {
    client.emit('connected-to-room');
  }

  roomNotExist(client: Socket) {
    client.emit('room-not-exist');
  }
}
