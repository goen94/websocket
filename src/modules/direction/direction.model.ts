import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'directions' })
export class DirectionModel extends Model<DirectionModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'origin_latitude' })
  originLatitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'origin_longitude' })
  originLongitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'destination_latitude' })
  destinationLatitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'destination_longitude' })
  destinationLongitude: number;

  @Column({ type: DataType.TEXT('long') })
  response: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
