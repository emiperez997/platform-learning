import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Teacher } from "./interfaces/Teacher";
import { CreateTeacherDto } from "./dto/CreateTeacherDto";
import { ErrorCodes } from "src/utils/ErrorCodes";
import { hashPassword } from "src/utils/HashPassword";
import { UpdateTeacherDto } from "./dto/UpdateTeacherDto";

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!teacher) {
      throw new HttpException("Teacher not found", 404);
    }

    return teacher;
  }

  async create(teacher: CreateTeacherDto): Promise<Teacher> {
    const teacherExists = await this.prisma.teacher.findUnique({
      where: {
        email: teacher.email,
      },
    });

    if (teacherExists) {
      throw new HttpException("Teacher already exists", 400);
    }

    const hashedPassword = await hashPassword(teacher.password);

    try {
      const teacherDB = await this.prisma.teacher.create({
        data: {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          password: hashedPassword,
          status: teacher.status,
        },
      });

      return teacherDB;
    } catch (error) {
      throw new HttpException(
        ErrorCodes[error.code],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, teacher: UpdateTeacherDto): Promise<Teacher> {
    const teacherExists = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!teacherExists) {
      throw new HttpException("Teacher not found", 404);
    }

    try {
      const teacherDB = await this.prisma.teacher.update({
        where: {
          id,
        },
        data: {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          status: teacher.status,
        },
      });

      return teacherDB;
    } catch (error) {
      throw new HttpException(
        ErrorCodes[error.code],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<Teacher> {
    const teacherExists = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!teacherExists) {
      throw new HttpException("Teacher not found", 404);
    }

    try {
      const teacherDB = await this.prisma.teacher.delete({
        where: {
          id,
        },
      });

      return teacherDB;
    } catch (error) {
      throw new HttpException(
        ErrorCodes[error.code],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
