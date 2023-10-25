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
import { TripService } from '../modules/trip/trip.service';
import { BusService } from '../modules/bus/bus.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit {
  logger = new Logger(EventsGateway.name);
  @WebSocketServer() server: Server;

  constructor(
    private appService: AppService,
    private busService: BusService,
    private tripService: TripService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.server = server;
    this.appService.socket = server;
    this.logger.log('Websocket started');
  }

  @SubscribeMessage('updateLocation')
  async subsLocationUpdate(@MessageBody() data: any) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    await this.busService.updateLocation(
      data.busId,
      data.latitude,
      data.longitude,
    );
  }

  @SubscribeMessage('bus')
  async getBus(@ConnectedSocket() client: Socket) {
    const buses = await this.busService.findAllBus();
    client.emit('bus', buses);
  }

  @SubscribeMessage('trip')
  async subsActiveTrip(@MessageBody() data: any) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const trip = await this.tripService.getActiveTrip(data.studentId);
    this.server.emit('trip_' + data.studentId, trip);
  }
}
