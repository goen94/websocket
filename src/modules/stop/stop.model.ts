import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RouteModel } from '../route/route.model';
import { RouteStopModel } from '../route-stop/route-stop.model';
import { TripModel } from '../trip/trip.model';

@Table({ tableName: 'stops' })
export class StopModel extends Model<StopModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.STRING })
  code: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'latitude' })
  latitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'longitude' })
  longitude: number;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsToMany(() => RouteModel, () => RouteStopModel)
  routes: RouteModel[];

  @HasMany(() => TripModel, 'start_stop_id')
  tripsStart: TripModel[];
}
