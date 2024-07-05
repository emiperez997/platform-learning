import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, JwtService],
})
export class CourseModule {}
