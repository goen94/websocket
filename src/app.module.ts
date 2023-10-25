import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BusModel } from './modules/bus/bus.model';
import { OperatorModel } from './modules/operator/operator.model';
import { RouteModel } from './modules/route/route.model';
import { RouteStopModel } from './modules/route-stop/route-stop.model';
import { StopModel } from './modules/stop/stop.model';
import { StudentModel } from './modules/student/student.model';
import { TripModel } from './modules/trip/trip.model';
import { TripStudentModel } from './modules/trip-student/trip-student.model';
import { UserModel } from './modules/user/user.model';
import { TripService } from './modules/trip/trip.service';
import { BusService } from './modules/bus/bus.service';
import { DirectionModel } from './modules/direction/direction.model';
import { DirectionService } from './modules/direction/direction.service';
import EventsService from './events/events.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env['DB_HOST'],
      port: Number(process.env['DB_PORT']),
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
      autoLoadModels: true,
      logging: false,
    }),
    SequelizeModule.forFeature([
      BusModel,
      DirectionModel,
      OperatorModel,
      RouteModel,
      RouteStopModel,
      StopModel,
      StudentModel,
      TripModel,
      TripStudentModel,
      UserModel,
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BusService,
    EventsGateway,
    EventsService,
    TripService,
    DirectionService,
  ],
})
export class AppModule {}
