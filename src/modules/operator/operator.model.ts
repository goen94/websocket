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
import { UserModel } from '../user/user.model';
import { BusModel } from '../bus/bus.model';

@Table({ tableName: 'operators' })
export class OperatorModel extends Model<OperatorModel> {
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

  @Column({ type: DataType.STRING, field: 'phone_number' })
  phoneNumber: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.BIGINT, field: 'user_id' })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => BusModel, 'driver_id')
  busesDriver: BusModel[];

  @HasMany(() => BusModel, 'officer_id')
  busesOperator: BusModel[];
}
