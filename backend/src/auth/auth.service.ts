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
    if (email.split("@")[0].includes("+teacher")) {
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

    // Check if the email is an admin
    if (email.split("@")[1].includes("admin")) {
      const admin = await this.adminService.findByEmail(email);

      if (!admin) {
        return false;
      }

      const isPasswordCorrect = await comparePasswords(
        password,
        admin.password,
      );

      if (!isPasswordCorrect) {
        return false;
      }
    }

    const student = await this.studentService.findByEmail(email);

    if (!student) {
      return false;
    }

    const isPasswordCorrect = await comparePasswords(
      password,
      student.password,
    );

    if (!isPasswordCorrect) {
      return false;
    }

    return true;
  }
}
