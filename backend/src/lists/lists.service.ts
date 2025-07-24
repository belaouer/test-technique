import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskList } from './list.entity';
import { User } from '../users/user.entity';
import { CreateListDto } from './dto/create-list.dto';


@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(TaskList)
    private listRepository: Repository<TaskList>,
  ) {}

  async create(createDto: CreateListDto, user: User): Promise<TaskList> {
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
}
