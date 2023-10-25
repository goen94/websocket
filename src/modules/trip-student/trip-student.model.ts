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

@Table({ tableName: 'trip_students' })
export class TripStudentModel extends Model<TripStudentModel> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @ForeignKey(() => TripModel)
  @Column({ type: DataType.BIGINT, field: 'trip_id' })
  tripId: number;

  @ForeignKey(() => StudentModel)
  @Column({ type: DataType.BIGINT, field: 'student_id' })
  studentId: number;

  @Column({ type: DataType.BOOLEAN })
  status: boolean;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => TripModel)
  trip: TripModel;

  @BelongsTo(() => StudentModel)
  student: StudentModel;
}
