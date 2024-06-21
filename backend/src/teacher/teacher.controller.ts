import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './interfaces/Teacher';
import { CreateTeacherDto } from './dto/CreateTeacherDto';
import { UpdateTeacherDto } from './dto/UpdateTeacherDto';

@Controller('/teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Teacher> {
    if (isNaN(Number(id))) {
      throw new HttpException('Invalid id', 400);
    }

    return this.teacherService.findOne(Number(id));
  }

  @Post()
  async create(@Body() teacher: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() teacher: UpdateTeacherDto,
  ): Promise<Teacher> {
    if (isNaN(Number(id))) {
      throw new HttpException('Invalid id', 400);
    }

    return this.teacherService.update(Number(id), teacher);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Teacher> {
    if (isNaN(Number(id))) {
      throw new HttpException('Invalid id', 400);
    }

    return this.teacherService.delete(Number(id));
  }
}
