import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RouteModel } from '../route/route.model';
import { StopModel } from '../stop/stop.model';

@Table({ tableName: 'route_stops' })
export class RouteStopModel extends Model<RouteStopModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @ForeignKey(() => RouteModel)
  @Column({ type: DataType.BIGINT, field: 'route_id' })
  routeId: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'stop_id' })
  stopId: number;

  @Column({ type: DataType.INTEGER, field: 'id' })
  order: number;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => RouteModel)
  route: RouteModel;

  @BelongsTo(() => StopModel)
  stop: StopModel;
}
