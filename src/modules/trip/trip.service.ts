import { InjectModel } from '@nestjs/sequelize';
import { TripModel } from './trip.model';
import { Injectable } from '@nestjs/common';
import { StudentModel } from '../student/student.model';
import { Op } from 'sequelize';
import { BusModel } from '../bus/bus.model';
import { StopModel } from '../stop/stop.model';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(TripModel) private readonly tripModel: typeof TripModel,
  ) {}

  async getActiveTrip(studentId: number) {
    return await this.tripModel.findOne({
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
          as: 'startStop',
          required: false,
        },
        {
          model: StopModel,
          as: 'nextStop',
          required: false,
        },
        {
          model: StopModel,
          as: 'endStop',
          required: false,
        },
      ],
    });
  }

  async getBusActiveTrip(busId: number) {
    return await this.tripModel.findOne({
      where: { busId, status: { [Op.ne]: 'success' } },
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
          as: 'startStop',
          required: false,
        },
        {
          model: StopModel,
          as: 'nextStop',
          required: false,
        },
        {
          model: StopModel,
          as: 'endStop',
          required: false,
        },
      ],
    });
  }
}
