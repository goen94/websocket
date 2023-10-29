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
import { TripModel } from '../trip/trip.model';
import { StudentModel } from '../student/student.model';

@Table({ tableName: 'trip_students', timestamps: false })
export class TripStudentModel extends Model<TripStudentModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @ForeignKey(() => TripModel)
  @Column({ type: DataType.BIGINT, field: 'trip_id' })
  trip_id: number;

  @ForeignKey(() => StudentModel)
  @Column({ type: DataType.BIGINT, field: 'student_id' })
  student_id: number;

  @Column({ type: DataType.BOOLEAN })
  status: boolean;

  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;

  @BelongsTo(() => TripModel)
  trip: TripModel;

  @BelongsTo(() => StudentModel)
  student: StudentModel;
}
