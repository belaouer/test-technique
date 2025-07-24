import { IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  shortDescription: string;

  @IsOptional()
  longDescription?: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsNotEmpty()
  @IsUUID()
  listId: string;
}
