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

  @SubscribeMessage('check')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('snus');
    console.log(`Да ты охуел, вот тебе данные: ${data}`);
  }

  @SubscribeMessage('sender-join')
  handleSenderJoin(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.join(data.uid);
  }

  @SubscribeMessage('receiver-join')
  handleReceiverJoin(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.join(data.uid);
    client.in(data.sender_uid).emit('init', data.uid);
  }

  @SubscribeMessage('file-meta')
  handleFileMeta(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.in(data.uid).emit('fs-meta', data.metadata);
  }

  @SubscribeMessage('fs-start')
  handleFsStart(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.in(data.uid).emit('fs-share', {});
  }

  @SubscribeMessage('file-raw')
  handleFileRaw(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.in(data.uid).emit('fs-share', data.buffer);
  }

  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client disconnected: ${client.id}`);
  }
}
