import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Student } from "./interfaces/Student";
import { CreateStudentDto } from "./dto/CreateStudentDto";
import { UpdateStudentDto } from "./dto/UpdateStudentDto";
import { hashPassword } from "src/utils/HashPassword";

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      throw new HttpException("Student not found", 404);
    }

    return student;
  }

  async findByEmail(email: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      throw new HttpException("Student not found", 404);
    }

    return student;
  }

  async create(student: CreateStudentDto): Promise<Student> {
    const studentExists = await this.prisma.student.findUnique({
      where: {
        email: student.email,
      },
    });

    if (studentExists) {
      throw new HttpException(
        "Student already registered with this email",
        400,
      );
    }

    try {
      const studentDB = await this.prisma.student.create({
        data: {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          status: student.status,
        },
      });

      return studentDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, student: UpdateStudentDto): Promise<Student> {
    const studentExists = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!studentExists) {
      throw new HttpException("Student not found", 404);
    }

    try {
      const studentDB = await this.prisma.student.update({
        where: {
          id,
        },
        data: {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          status: student.status,
        },
      });

      return studentDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<Student> {
    const studentExists = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!studentExists) {
      throw new HttpException("Student not found", 404);
    }

    try {
      const studentDB = await this.prisma.student.delete({
        where: {
          id,
        },
      });

      return studentDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
