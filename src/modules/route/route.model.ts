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
import { RouteStopModel } from '../route-stop/route-stop.model';
import { StopModel } from '../stop/stop.model';
import { BusModel } from '../bus/bus.model';
import { TripModel } from '../trip/trip.model';

@Table({ tableName: 'routes' })
export class RouteModel extends Model<RouteModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.STRING })
  code: string;

  @Column({ type: DataType.STRING })
  route: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsToMany(() => StopModel, () => RouteStopModel)
  stops: StopModel[];

  @HasMany(() => BusModel)
  buses: BusModel[];

  @HasMany(() => TripModel)
  trips: TripModel[];
}
