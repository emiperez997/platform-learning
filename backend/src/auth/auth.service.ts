import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { comparePasswords } from "src/utils/HashPassword";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ token: string }> {
    let token: string;

    // Check if the email is an admin

    const admin = await this.adminService.findByEmail(email);

    if (!admin) {
      throw new HttpException("Admin not found", 404);
    }

    const isPasswordCorrect = await comparePasswords(password, admin.password);

    if (!isPasswordCorrect) {
      throw new HttpException("Invalid password", 400);
    }

    const payload = {
      email: email,
      sub: admin.id,
      role: "admin",
    };

    token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
