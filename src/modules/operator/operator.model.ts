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

@Table({ tableName: 'operators', timestamps: false })
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
  phone_number: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.BIGINT, field: 'user_id' })
  user_id: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => BusModel, 'driver_id')
  buses_driver: BusModel[];

  @HasMany(() => BusModel, 'officer_id')
  buses_operator: BusModel[];
}
