import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inscription } from './interfaces/Inscription';
import { CreateInscriptionDto } from './dto/CreateInscriptionDto';
import { UpdateInscriptionDto } from './dto/UpdateInscription';

@Injectable()
export class InscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Inscription[]> {
    return this.prisma.inscription.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Inscription> {
    const inscription = await this.prisma.inscription.findUnique({
      where: {
        id,
      },
    });

    if (!inscription) {
      throw new HttpException('Inscription not found', 404);
    }

    return inscription;
  }

  async create(inscription: CreateInscriptionDto): Promise<Inscription> {
    if (!inscription.courseId || !inscription.studentId) {
      throw new HttpException('Invalid data', 400);
    }

    if (
      inscription.status !== 'PENDING' &&
      inscription.status !== 'ACCEPTED' &&
      inscription.status !== 'REJECTED'
    ) {
      throw new HttpException('Invalid status', 400);
    }

    try {
      const inscriptionDB = await this.prisma.inscription.create({
        data: {
          status: inscription.status,
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException('Inscription not found', 404);
    }

    if (
      inscription.status !== 'PENDING' &&
      inscription.status !== 'ACCEPTED' &&
      inscription.status !== 'REJECTED'
    ) {
      throw new HttpException('Invalid status', 400);
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
      throw new HttpException('Inscription not found', 404);
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