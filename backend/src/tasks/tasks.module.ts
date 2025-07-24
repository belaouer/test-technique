import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskList } from 'src/lists/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
