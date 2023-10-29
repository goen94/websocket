import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BusModel } from './bus.model';
import { TripService } from '../trip/trip.service';
import { DirectionService } from '../direction/direction.service';
import { AppService } from '../../app.service';
import { TripModel } from '../trip/trip.model';

@Injectable()
export class BusService {
  constructor(
    @InjectModel(BusModel) private readonly busModel: typeof BusModel,
    private tripService: TripService,
    private directionService: DirectionService,
    private appService: AppService,
  ) {}

  async findAllBus() {
    return this.busModel.findAll();
  }

  async updateLocation(
    busId: number,
    latitude: number,
    longitude: number,
    bearing: number,
  ) {
    const bus = await this.busModel.findOne({ where: { id: busId } });
    if (bus) {
      bus.latitude = latitude;
      bus.longitude = longitude;
      await bus.save();

      const buses = await this.findAllBus();
      this.appService.socket.emit('bus', buses);

      const trip = await this.tripService.getBusActiveTrip(bus.id);
      if (trip) {
        this.emitForBus(trip, bearing);
        const nextRoute = await this.directionService.getDirection(
          trip.current_latitude,
          trip.current_longitude,
          trip.next_stop.latitude,
          trip.next_stop.longitude,
        );

        trip.current_latitude = bus.latitude;
        trip.current_longitude = bus.longitude;
        await trip.save();
        for (const student of trip.students) {
          if (!student['TripStudentModel']['status']) {
            const route = await this.directionService.getDirection(
              trip.current_latitude,
              trip.current_longitude,
              student.stop.latitude,
              student.stop.longitude,
            );
            this.appService.socket.emit('trip_' + student.id, {
              trip,
              bearing,
              route,
              nextRoute,
            });
          }
        }
      }
    }
  }

  async emitForBus(trip: TripModel, bearing: number) {
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
        bearing,
        route,
        nextRoute,
      });
    }
  }
}
