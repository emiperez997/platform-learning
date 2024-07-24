import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Inscription } from "./interfaces/Inscription";
import { CreateInscriptionDto } from "./dto/CreateInscriptionDto";
import { UpdateInscriptionDto } from "./dto/UpdateInscription";
import { ErrorCodes } from "src/utils/ErrorCodes";
import { log } from "console";

@Injectable()
export class InscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Inscription[]> {
    return this.prisma.inscription.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        course: true,
        student: true,
      },
    });
  }

  async findOne(id: number): Promise<Inscription> {
    const inscription = await this.prisma.inscription.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
        student: true,
      },
    });

    if (!inscription) {
      throw new HttpException("Inscription not found", 404);
    }

    return inscription;
  }

  async create(inscription: CreateInscriptionDto): Promise<Inscription> {
    try {
      const inscriptionDB = await this.prisma.inscription.create({
        data: {
          course: {
            connect: {
              id: inscription.courseId,
            },
          },
          student: {
            connect: {
              id: inscription.studentId,
            },
          },
        },
      });

      return inscriptionDB;
    } catch (error) {
      throw new HttpException(
        ErrorCodes[error.code].message,
        ErrorCodes[error.code].code,
      );
    }
  }

  async update(
    id: number,
    inscription: UpdateInscriptionDto,
  ): Promise<Inscription> {
    const inscriptionExists = await this.prisma.inscription.findUnique({
      where: {
        id,
      },
    });

    if (!inscriptionExists) {
      throw new HttpException("Inscription not found", 404);
    }

    try {
      const inscriptionDB = await this.prisma.inscription.update({
        where: {
          id,
        },
        data: {
          status: inscription.status,
        },
      });

      return inscriptionDB;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<Inscription> {
    const inscriptionExists = await this.prisma.inscription.findUnique({
      where: {
        id,
      },
    });

    if (!inscriptionExists) {
      throw new HttpException("Inscription not found", 404);
    }

    try {
      const inscriptionDB = await this.prisma.inscription.delete({
        where: {
          id,
        },
      });

      return inscriptionDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
