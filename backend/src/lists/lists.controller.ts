import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateListDto } from './dto/create-list.dto';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() dto: CreateListDto, @Request() req) {
    return this.listsService.create(dto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.listsService.findAll(req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.listsService.remove(id, req.user);
  }

  @Get(':id/tasks')
  getTasksByList(@Param('id') id: string, @Request() req) {
    return this.listsService.getTasksByList(id, req.user);
  }
}
