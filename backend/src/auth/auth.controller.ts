import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/LoginDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body(ValidationPipe) body: LoginDto,
  ): Promise<{ token: string }> {
    return this.authService.login(body.email, body.password);
  }
}
