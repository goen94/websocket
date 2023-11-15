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
import { DirectionService } from '../modules/direction/direction.service';

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
    private directionService: DirectionService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.server = server;
    this.appService.socket = server;
    this.logger.log('Websocket started');
  }

  @SubscribeMessage('updateTripStatus')
  async updateTripStatus(@MessageBody() data: any) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    await this.busService.updateLocation(
      data.busId,
      data.latitude,
      data.longitude,
      data.bearing,
    );
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
      data.bearing,
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
    await this.tripService.getActiveTrip(data.studentId);
  }

  @SubscribeMessage('tripBus')
  async subsActiveTripBus(@MessageBody() data: any) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const { trip, busRoute } = await this.tripService.getBusActiveTrip(
      data.busId,
    );
    if (trip) {
      const nextRoute = await this.directionService.getDirection(
        trip.current_latitude,
        trip.current_longitude,
        trip.next_stop.latitude,
        trip.next_stop.longitude,
      );
      const route = await this.directionService.getDirection(
        trip.current_latitude,
        trip.current_longitude,
        trip.end_stop.latitude,
        trip.end_stop.longitude,
      );
      this.appService.socket.emit('trip_bus_' + trip.bus_id, {
        trip,
        bearing: 0,
        bus_route: busRoute,
        route,
        nextRoute,
      });
    }
  }

  @SubscribeMessage('tripDriver')
  async subsActiveTripDriver(@MessageBody() data: any) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const { trip, busRoute } = await this.tripService.getDriverActiveTrip(
      data.driverId,
    );

    if (trip) {
      const nextRoute = await this.directionService.getDirection(
        trip.current_latitude,
        trip.current_longitude,
        trip.next_stop.latitude,
        trip.next_stop.longitude,
      );
      const route = await this.directionService.getDirection(
        trip.current_latitude,
        trip.current_longitude,
        trip.end_stop.latitude,
        trip.end_stop.longitude,
      );
      this.appService.socket.emit('trip_driver_' + trip.driver_id, {
        trip,
        bearing: 0,
        bus_route: busRoute,
        route,
        nextRoute,
      });
    }
  }

  @SubscribeMessage('updateTrip')
  async updateTrip(@MessageBody() data: any) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    await this.tripService.updateTrip(data.tripId);
  }
}
