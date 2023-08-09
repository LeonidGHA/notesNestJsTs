import { Column, Model, Table, DataType } from 'sequelize-typescript';

import { INote } from '../interface/note.interface';

@Table({ tableName: 'notes', timestamps: true })
export class NotesModel extends Model<NotesModel, INote> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING, allowNull: false })
  dates: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;
}
