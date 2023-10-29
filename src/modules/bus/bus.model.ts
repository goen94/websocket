import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OperatorModel } from '../operator/operator.model';
import { RouteModel } from '../route/route.model';
import { TripModel } from '../trip/trip.model';

@Table({ tableName: 'buses', timestamps: false })
export class BusModel extends Model<BusModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.STRING })
  code: string;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => OperatorModel)
  @Column({ type: DataType.BIGINT, field: 'driver_id' })
  driver_id: number;

  @ForeignKey(() => OperatorModel)
  @Column({ type: DataType.BIGINT, field: 'officer_id' })
  officer_id: number;

  @ForeignKey(() => RouteModel)
  @Column({ type: DataType.BIGINT, field: 'route_id' })
  route_id: number;

  @Column({ type: DataType.STRING, field: 'license_plate' })
  license_plate: string;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'latitude' })
  latitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'longitude' })
  longitude: number;

  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;

  @BelongsTo(() => OperatorModel, 'driver_id')
  driver: OperatorModel;

  @BelongsTo(() => OperatorModel, 'officer_id')
  officer: OperatorModel;

  @BelongsTo(() => RouteModel)
  route: RouteModel;

  @HasMany(() => TripModel)
  trips: TripModel[];
}
