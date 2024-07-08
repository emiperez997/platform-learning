import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { hashPassword } from "src/utils/HashPassword";
import { Role, User } from "@prisma/client";
import { UpdateUserDto } from "./dto/UpdateUserDto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException("Admin not found", 404);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException("Admin not found", 404);
    }

    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    if (!user.email || !user.password || !user.status) {
      throw new HttpException("Invalid data", 400);
    }

    const userExists = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new HttpException("Admin already exists", 400);
    }

    const hashedPassword = await hashPassword(user.password);

    try {
      const userDB = await this.prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          status: user.status,
          role: user.role,
        },
      });

      return userDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException("Admin not found", 404);
    }

    try {
      const userDB = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email: user.email,
        },
      });

      return userDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException("Admin not found", 404);
    }

    try {
      const userDB = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return userDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
