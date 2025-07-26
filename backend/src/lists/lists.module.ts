import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './list.entity';
import { User } from 'src/users/user.entity';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, User]), TasksModule],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
