import { InjectModel } from '@nestjs/sequelize';
import { TripModel } from './trip.model';
import { Injectable } from '@nestjs/common';
import { StudentModel } from '../student/student.model';
import { Op } from 'sequelize';
import { BusModel } from '../bus/bus.model';
import { StopModel } from '../stop/stop.model';
import { TripStudentModel } from '../trip-student/trip-student.model';
import { DirectionService } from '../direction/direction.service';
import { AppService } from '../../app.service';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(TripModel) private readonly tripModel: typeof TripModel,
    @InjectModel(TripModel)
    private readonly tripStudentsModel: typeof TripStudentModel,
    private directionService: DirectionService,
    private appService: AppService,
  ) {}

  async updateTripStatus(
    tripId: number,
    isSuccess: boolean,
    latitude: number,
    longitude: number,
  ) {
    const trip = await this.tripModel.findOne({ where: { id: tripId } });
    if (trip) {
      const tripStudents = await this.tripStudentsModel.findAll({
        where: { trip_id: tripId },
        include: [
          {
            model: StudentModel,
            where: { stop_id: trip.next_stop_id },
          },
        ],
      });

      for (const student of tripStudents) {
        student.status = true;
        await student.save();
      }
    }
  }

  async getActiveTrip(studentId: number) {
    const trip = await this.tripModel.findOne({
      where: { status: { [Op.ne]: 'success' } },
      include: [
        {
          model: StudentModel,
          where: { id: studentId },
          include: [
            {
              model: StopModel,
            },
          ],
        },
        {
          model: BusModel,
        },
        {
          model: StopModel,
          as: 'start_stop',
          required: false,
        },
        {
          model: StopModel,
          as: 'next_stop',
          required: false,
        },
        {
          model: StopModel,
          as: 'end_stop',
          required: false,
        },
      ],
    });

    if (trip) {
      const nextRoute = await this.directionService.getDirection(
        trip.current_latitude,
        trip.current_longitude,
        trip.next_stop.latitude,
        trip.next_stop.longitude,
      );

      trip.current_latitude = trip.bus.latitude;
      trip.current_longitude = trip.bus.longitude;
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
            bearing: 0,
            trip,
            route,
            nextRoute,
          });
        }
      }
    }
  }

  async getBusActiveTrip(busId: number) {
    return await this.tripModel.findOne({
      where: { bus_id: busId, status: { [Op.ne]: 'success' } },
      include: [
        {
          model: StudentModel,
          include: [
            {
              model: StopModel,
            },
          ],
        },
        {
          model: BusModel,
        },
        {
          model: StopModel,
          as: 'start_stop',
          required: false,
        },
        {
          model: StopModel,
          as: 'next_stop',
          required: false,
        },
        {
          model: StopModel,
          as: 'end_stop',
          required: false,
        },
      ],
    });
  }
}
