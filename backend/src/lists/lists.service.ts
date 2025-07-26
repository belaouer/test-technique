import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskList } from './list.entity';
import { User } from '../users/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(TaskList)
    private listRepository: Repository<TaskList>,
    private readonly tasksService: TasksService,
  ) {}

  async create(createDto: CreateListDto, user: User): Promise<TaskList> {
    const existing = await this.listRepository.findOne({
      where: { name: createDto.name, owner: { id: user.id } },
    });

    if (existing) {
      throw new ConflictException('Une liste avec ce nom existe déjà.');
    }

    const list = this.listRepository.create({
      ...createDto,
      owner: user,
    });

    return this.listRepository.save(list);
  }

  async findAll(user: User): Promise<TaskList[]> {
    return this.listRepository.find({
      where: { owner: { id: user.id } },
      relations: ['tasks'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<TaskList> {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['owner', 'tasks'],
    });

    if (!list) throw new NotFoundException('List not found');
    if (list.owner.id !== user.id) throw new ForbiddenException();

    return list;
  }

  async remove(id: string, user: User): Promise<void> {
    const list = await this.findOne(id, user);
    await this.listRepository.remove(list);
  }

  async getTasksByList(listId: string, user: any) {
    return this.tasksService.getByListId(listId, user.id);
  }
}
