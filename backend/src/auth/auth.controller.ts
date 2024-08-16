import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/LoginDto";
import { Login } from "./interfaces/Login";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body(ValidationPipe) login: LoginDto,
  ): Promise<{ token: string }> {
    return this.authService.login(login);
  }

  @Get("verify")
  async verifyToken(@Query("token") token: string): Promise<Login> {
    return this.authService.verifyToken(token);
  }
}
