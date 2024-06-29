import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminService } from "src/admin/admin.service";
import { TeacherService } from "src/teacher/teacher.service";
import { StudentService } from "src/student/student.service";

@Module({
  imports: [AdminService, TeacherService, StudentService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
