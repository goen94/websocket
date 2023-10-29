import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'directions', timestamps: false })
export class DirectionModel extends Model<DirectionModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'origin_latitude' })
  origin_latitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'origin_longitude' })
  origin_longitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'destination_latitude' })
  destination_latitude: number;

  @Column({ type: DataType.DOUBLE(10, 6), field: 'destination_longitude' })
  destination_longitude: number;

  @Column({ type: DataType.TEXT('long') })
  response: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;
}
