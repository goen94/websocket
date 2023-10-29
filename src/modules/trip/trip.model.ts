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

@Table({ tableName: 'trips', timestamps: false })
export class TripModel extends Model<TripModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @ForeignKey(() => BusModel)
  @Column({ type: DataType.BIGINT, field: 'bus_id' })
  bus_id: number;

  @ForeignKey(() => OperatorModel)
  @Column({ type: DataType.BIGINT, field: 'driver_id' })
  driver_id: number;

  @ForeignKey(() => RouteModel)
  @Column({ type: DataType.BIGINT, field: 'route_id' })
  route_id: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'start_stop_id' })
  start_stop_id: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'next_stop_id' })
  next_stop_id: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'end_stop_id' })
  end_stop_id: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'current_latitude' })
  current_latitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'current_longitude' })
  current_longitude: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;

  @BelongsTo(() => BusModel)
  bus: BusModel;

  @BelongsTo(() => RouteModel)
  route: RouteModel;

  @BelongsTo(() => StopModel, 'start_stop_id')
  start_stop: StopModel;

  @BelongsTo(() => StopModel, 'next_stop_id')
  next_stop: StopModel;

  @BelongsTo(() => StopModel, 'end_stop_id')
  end_stop: StopModel;

  @BelongsToMany(() => StudentModel, () => TripStudentModel)
  students: StudentModel[];
}
