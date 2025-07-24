
import { TaskList } from 'src/lists/list.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';


@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shortDescription: string;

  @Column({ nullable: true })
  longDescription?: string;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => TaskList, (list) => list.tasks, { onDelete: 'CASCADE' })
  list: TaskList;
}
