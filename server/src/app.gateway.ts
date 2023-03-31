import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5000, { cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  rooms: Array<{ senderId: string; roomId: string }>;

  constructor() {
    this.rooms = [];
  }

  @SubscribeMessage('check')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('snus');
    console.log(`Да ты охуел, вот тебе данные: ${data}`);
  }

  @SubscribeMessage('sender-join')
  handleSenderJoin(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('sender-join');
    this.rooms.push({
      senderId: client.id,
      roomId: data.uid,
    });
    client.join(data.uid);
  }

  @SubscribeMessage('client-leave')
  handleDisconnectClient(@ConnectedSocket() client: Socket) {
    console.log('client-leave: ', client.id);
    this.rooms = this.rooms.filter((room) => room.senderId !== client.id);
  }

  @SubscribeMessage('receiver-join')
  handleReceiverJoin(@MessageBody() data, @ConnectedSocket() client: Socket) {
    if (this.rooms.some((room) => room.roomId === data.uid)) {
      console.log('receiver-join');
      client.join(data.uid);
      this.connectedToRoom(client);
    } else {
      this.roomNotExist(client);
    }
  }

  @SubscribeMessage('send-file')
  handleSendFile(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.in(data.uid).emit('file', {
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

  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client disconnected: ${client.id}`);
  }
}
