import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionModel } from './direction.model';
import axios from 'axios';

@Injectable()
export class DirectionService {
  constructor(
    @InjectModel(DirectionModel)
    private readonly directionModel: typeof DirectionModel,
  ) {}

  async getDirection(
    originLat: number,
    originLong: number,
    desLat: number,
    desLong: number,
  ) {
    const direction = await this.directionModel.findOne({
      where: {
        originLatitude: originLat,
        originLongitude: originLong,
        destinationLatitude: desLat,
        destinationLongitude: desLong,
      },
    });

    if (direction) {
      return JSON.parse(direction.response);
    } else {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLong}&destination=${desLat},${desLong}&key=${process.env['GOOGLE_KEY']}`,
        );
        if (res.data) {
          await this.directionModel.create({
            originLatitude: originLat,
            originLongitude: originLong,
            destinationLatitude: desLat,
            destinationLongitude: desLong,
            response: JSON.stringify(res.data),
          });
          return res.data;
        }
      } catch (e) {}
    }
  }
}
