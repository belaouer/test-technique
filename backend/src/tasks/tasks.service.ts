import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { TaskList } from '../lists/list.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(TaskList)
    private listRepo: Repository<TaskList>,
  ) {}

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const list = await this.listRepo.findOne({
      where: { id: dto.listId },
      relations: ['owner'],
    });

    if (!list) throw new NotFoundException('Task list not found');
    if (list.owner.id !== user.id) throw new ForbiddenException();

    const task = this.taskRepo.create({
      ...dto,
      dueDate: new Date(dto.dueDate),
      list,
    });

    return this.taskRepo.save(task);
  }

  async toggleComplete(id: string, user: User): Promise<Task> {
    const task = await this.findOne(id, user);
    task.completed = !task.completed;
    return this.taskRepo.save(task);
  }

  async findAllForList(listId: string, user: User): Promise<Task[]> {
    const list = await this.listRepo.findOne({
      where: { id: listId },
      relations: ['owner'],
    });

    if (!list) throw new NotFoundException();
    if (list.owner.id !== user.id) throw new ForbiddenException();

    return this.taskRepo.find({
      where: { list: { id: listId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['list', 'list.owner'],
    });

    if (!task) throw new NotFoundException();
    if (task.list.owner.id !== user.id) throw new ForbiddenException();

    return task;
  }

  async remove(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.taskRepo.remove(task);
  }
}
