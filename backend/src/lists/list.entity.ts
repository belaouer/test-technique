import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.taskLists, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Task, (task) => task.list, { cascade: true })
  tasks: Task[];
}
