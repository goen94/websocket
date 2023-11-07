import { InjectModel } from '@nestjs/sequelize';
import { TripModel } from './trip.model';
import { Injectable } from '@nestjs/common';
import { StudentModel } from '../student/student.model';
import { Op, Sequelize } from 'sequelize';
import { BusModel } from '../bus/bus.model';
import { StopModel } from '../stop/stop.model';
import { DirectionService } from '../direction/direction.service';
import { AppService } from '../../app.service';
import { RouteModel } from '../route/route.model';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(TripModel) private readonly tripModel: typeof TripModel,
    @InjectModel(RouteModel)
    private readonly routeModel: typeof RouteModel,
    private directionService: DirectionService,
    private appService: AppService,
  ) {}

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
      const busRoute = await this.routeModel.findOne({
        where: { id: trip.route_id },
        include: [{ model: StopModel }],
        order: [[Sequelize.literal('`stops.RouteStopModel.order`'), 'ASC']],
      });

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
            bus_route: busRoute,
            route,
            nextRoute,
          });
        }
      }
    }
  }

  async getBusActiveTrip(busId: number) {
    const trip = await this.tripModel.findOne({
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

    const busRoute = await this.routeModel.findOne({
      where: { id: trip.route_id },
      include: [{ model: StopModel }],
      order: [[Sequelize.literal('`stops.RouteStopModel.order`'), 'ASC']],
    });

    return { trip, busRoute };
  }
}
