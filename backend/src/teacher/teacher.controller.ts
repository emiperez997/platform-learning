import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { Teacher } from "./interfaces/Teacher";
import { CreateTeacherDto } from "./dto/CreateTeacherDto";
import { UpdateTeacherDto } from "./dto/UpdateTeacherDto";
import { AuthGuard } from "src/auth/guards/AuthGuard";

@Controller("/teachers")
// @UseGuards(AuthGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Teacher> {
    return this.teacherService.findOne(Number(id));
  }

  @Post()
  async create(
    @Body(ValidationPipe) teacher: CreateTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @Put("/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) teacher: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.update(Number(id), teacher);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<Teacher> {
    return this.teacherService.delete(Number(id));
  }
}
