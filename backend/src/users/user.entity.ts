import { TaskList } from 'src/lists/list.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TaskList, (list) => list.owner)
  taskLists: TaskList[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
