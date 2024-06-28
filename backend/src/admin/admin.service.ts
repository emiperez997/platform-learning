import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Admin } from "./interfaces/Admin";
import { CreateAdminDto } from "./dto/CreateAdminDto";
import { UpdateAdminDto } from "./dto/UpdateAdminDto";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new HttpException("Admin not found", 404);
    }

    return admin;
  }

  async create(admin: CreateAdminDto): Promise<Admin> {
    if (!admin.email || !admin.password || !admin.status) {
      throw new HttpException("Invalid data", 400);
    }

    const adminExists = await this.prisma.admin.findUnique({
      where: {
        email: admin.email,
      },
    });

    if (adminExists) {
      throw new HttpException("Admin already exists", 400);
    }

    try {
      const adminDB = await this.prisma.admin.create({
        data: {
          email: admin.email,
          password: admin.password,
          status: admin.status,
        },
      });

      return adminDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, admin: UpdateAdminDto): Promise<Admin> {
    const adminExists = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!adminExists) {
      throw new HttpException("Admin not found", 404);
    }

    try {
      const adminDB = await this.prisma.admin.update({
        where: {
          id,
        },
        data: {
          email: admin.email,
        },
      });

      return adminDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<Admin> {
    const adminExists = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!adminExists) {
      throw new HttpException("Admin not found", 404);
    }

    try {
      const adminDB = await this.prisma.admin.delete({
        where: {
          id,
        },
      });

      return adminDB;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
