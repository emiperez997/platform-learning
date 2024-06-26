import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateCourseDto } from "./dto/CreateCourseDto";
import { Course } from "./interfaces/Course";
import { UpdateCourseDto } from "./dto/UpdateCourseDto";

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException("Course not found", 404);
    }

    return course;
  }

  async create(course: CreateCourseDto): Promise<Course> {
    if (
      !course.title ||
      !course.description ||
      !course.classNumber ||
      !course.beginDate ||
      !course.endDate ||
      !course.teacherId
    ) {
      throw new HttpException("Invalid data", 400);
    }

    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: course.teacherId,
      },
    });

    if (!teacher) {
      throw new HttpException("Teacher not found", 404);
    }

    try {
      const courseDB = await this.prisma.course.create({
        data: {
          title: course.title,
          description: course.description,
          classNumber: course.classNumber,
          beginDate: course.beginDate,
          endDate: course.endDate,
          status: course.status,
          teacher: {
            connect: {
              id: course.teacherId,
            },
          },
        },
      });

      return courseDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, course: UpdateCourseDto): Promise<Course> {
    const courseDB = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!courseDB) {
      throw new HttpException("Course not found", 404);
    }

    try {
      const courseUpdated = await this.prisma.course.update({
        where: {
          id,
        },
        data: {
          title: course.title,
          description: course.description,
          beginDate: course.beginDate,
          endDate: course.endDate,
          categories: course.categories,
          status: course.status,
          teacher: {
            connect: {
              id: course.teacherId,
            },
          },
        },
      });

      return courseUpdated;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<Course> {
    const courseDB = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!courseDB) {
      throw new HttpException("Course not found", 404);
    }

    try {
      const courseDeleted = await this.prisma.course.delete({
        where: {
          id,
        },
      });

      return courseDeleted;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
