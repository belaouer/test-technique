import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { TaskList } from '../lists/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
