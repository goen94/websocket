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
import { BusModel } from '../bus/bus.model';
import { StopModel } from '../stop/stop.model';

@Table({ tableName: 'students' })
export class StudentModel extends Model<StudentModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.STRING })
  code: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.BIGINT, field: 'school_id' })
  schoolId: number;

  @Column({ type: DataType.STRING })
  class: string;

  @ForeignKey(() => BusModel)
  @Column({ type: DataType.BIGINT, field: 'bus_id' })
  busId: number;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.STRING })
  rfid: string;

  @Column({ type: DataType.BIGINT, field: 'user_id' })
  userId: number;

  @ForeignKey(() => StopModel)
  @Column({ type: DataType.BIGINT, field: 'stop_id' })
  stopId: number;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => BusModel)
  bus: BusModel;

  @BelongsTo(() => StopModel)
  stop: StopModel;
}
