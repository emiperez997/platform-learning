import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [TeacherController],
  providers: [TeacherService, JwtService],
})
export class TeacherModule {}
