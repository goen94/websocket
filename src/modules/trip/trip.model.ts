import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OperatorModel } from '../operator/operator.model';
import { RouteModel } from '../route/route.model';
import { StopModel } from '../stop/stop.model';
import { BusModel } from '../bus/bus.model';
import { StudentModel } from '../student/student.model';
import { TripStudentModel } from '../trip-student/trip-student.model';

@Table({ tableName: 'trips' })
export class TripModel extends Model<TripModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @ForeignKey(() => BusModel)
  @Column({ type: DataType.BIGINT, field: 'bus_id' })
  busId: number;

  @ForeignKey(() => OperatorModel)
  @Column({ type: DataType.BIGINT, field: 'driver_id' })
  driverId: number;

  @ForeignKey(() => RouteModel)
  @Column({ type: DataType.BIGINT, field: 'route_id' })
  routeId: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'start_stop_id' })
  startStopId: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'next_stop_id' })
  nextStopId: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'end_stop_id' })
  endStopId: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'current_latitude' })
  currentLatitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'current_longitude' })
  currentLongitude: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => BusModel)
  bus: BusModel;

  @BelongsTo(() => RouteModel)
  route: RouteModel;

  @BelongsTo(() => StopModel, 'start_stop_id')
  startStop: StopModel;

  @BelongsTo(() => StopModel, 'next_stop_id')
  nextStop: StopModel;

  @BelongsTo(() => StopModel, 'end_stop_id')
  endStop: StopModel;

  @BelongsToMany(() => StudentModel, () => TripStudentModel)
  students: StudentModel[];
}
