import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminService } from "src/admin/admin.service";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AdminService, PrismaService, JwtService],
  exports: [AuthService, AdminService],
})
export class AuthModule {}
