import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

import { comparePasswords } from "src/utils/HashPassword";
import { LoginDto } from "./dto/LoginDto";
import { Login } from "./interfaces/Login";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(login.email);

    if (!user) {
      throw new HttpException("User not found", 404);
    }

    const isPasswordCorrect = await comparePasswords(
      login.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException("Invalid password", 400);
    }

    const payload: Login = {
      email: login.email,
      sub: user.id,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: "1h",
    });

    return { token };
  }

  verifyToken(token: string): Promise<Login> {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new HttpException("Invalid token", 401);
    }
  }
}
