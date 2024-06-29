import { Injectable } from "@nestjs/common";
import { AdminService } from "src/admin/admin.service";
import { StudentService } from "src/student/student.service";
import { TeacherService } from "src/teacher/teacher.service";
import { comparePasswords } from "src/utils/HashPassword";

@Injectable()
export class AuthService {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly adminService: AdminService,
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    // Check if the email is a teacher
    if (email.split("@")[0].includes("teacher")) {
      const teacher = await this.teacherService.findByEmail(email);

      if (!teacher) {
        return false;
      }

      const isPasswordCorrect = await comparePasswords(
        password,
        teacher.password,
      );

      if (!isPasswordCorrect) {
        return false;
      }
    }

    return true;
  }
}
