import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BusModel } from './bus.model';
import { TripService } from '../trip/trip.service';
import { DirectionService } from '../direction/direction.service';
import { AppService } from '../../app.service';

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

  async updateLocation(busId: number, latitude: number, longitude: number) {
    const bus = await this.busModel.findOne({ where: { id: busId } });
    if (bus) {
      bus.latitude = latitude;
      bus.longitude = longitude;
      await bus.save();

      const buses = await this.findAllBus();
      this.appService.socket.emit('bus', buses);

      const trip = await this.tripService.getBusActiveTrip(bus.id);
      trip.currentLatitude = bus.latitude;
      trip.currentLongitude = bus.longitude;
      await trip.save();

      for (const student of trip.students) {
        if (!student['TripStudentModel']['status']) {
          const route = await this.directionService.getDirection(
            trip.currentLatitude,
            trip.currentLongitude,
            student.stop.latitude,
            student.stop.longitude,
          );
          this.appService.socket.emit('trip_' + trip.id, { trip, route });
        }
      }
    }
  }
}
