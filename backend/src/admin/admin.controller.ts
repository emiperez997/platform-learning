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
import { Admin } from "./interfaces/Admin";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/CreateAdminDto";
import { UpdateAdminDto } from "./dto/UpdateAdminDto";
import { AuthGuard } from "src/auth/guards/AuthGuard";

@Controller("/admin")
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  async create(@Body(ValidationPipe) admin: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(admin);
  }

  @Put("/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) admin: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.update(id, admin);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<Admin> {
    return this.adminService.delete(id);
  }
}
