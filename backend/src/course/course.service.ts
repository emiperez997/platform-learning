import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto/CreateCourseDto";
import { Course } from "./interfaces/Course";
import { UpdateCourseDto } from "./dto/UpdateCourseDto";
import { CreateCourseData } from "./interfaces/CreateCourseData";

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        teacher: true,
        students: true,
      },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        students: true,
      },
    });

    if (!course) {
      throw new HttpException("Course not found", 404);
    }

    return course;
  }

  async create(course: CreateCourseDto): Promise<Course> {
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
          beginDate: new Date(course.beginDate),
          endDate: new Date(course.endDate),
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

    let data: CreateCourseData = {
      title: course.title,
      description: course.description,
      beginDate: course.beginDate ? new Date(course.beginDate) : undefined,
      endDate: course.endDate ? new Date(course.endDate) : undefined,
      status: course.status,
    };

    if (course.teacherId) {
      data.teacher = {
        connect: {
          id: course.teacherId,
        },
      };
    }

    try {
      const courseUpdated = await this.prisma.course.update({
        where: {
          id,
        },
        data,
      });

      return courseUpdated;
    } catch (error) {
      console.log(error.message);

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
