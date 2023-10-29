import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT, field: 'id' })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.DATE, field: 'email_verified_at' })
  email_verifiedAt: Date;

  @Column({ type: DataType.STRING, field: 'phone_number' })
  phone_number: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING, field: 'remember_token' })
  remember_token: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;
}
