import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AppService } from '../app.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit {
  logger = new Logger(EventsGateway.name);
  @WebSocketServer() server: Server;

  constructor(private appService: AppService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.server = server;
    this.appService.socket = server;
    this.logger.log('Websocket started');
  }

  @SubscribeMessage('updateLocation')
  subsLocationUpdate(
    @MessageBody() data: any,
  ) {
    this.server.emit('location', JSON.parse(data));
  }
}
