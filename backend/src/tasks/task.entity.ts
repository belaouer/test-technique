import { TaskList } from 'src/lists/list.entity';
import { User } from 'src/users/user.entity';
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
  title: string;

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
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;
}
