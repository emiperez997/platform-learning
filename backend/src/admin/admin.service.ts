import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Admin } from "./interfaces/Admin.ts";
import { CreateAdminDto } from "./dto/CreateAdminDto.ts";
import { UpdateAdminDto } from "./dto/UpdateAdminDto.ts";

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

  async findOne(id: string): Promise<Admin> {
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

    if (status !== "ACTIVE" && status !== "INACTIVE") {
      throw new HttpException("Invalid status", 400);
    }

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

  async update(id: string, admin: UpdateAdminDto): Promise<Admin> {
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

  async delete(id: string): Promise<Admin> {
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
