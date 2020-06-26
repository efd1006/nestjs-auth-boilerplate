import { Controller, Post, Body, UsePipes, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: LoginDTO
  ) {
    return await this.authService.login(dto)
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request
  ) {
    return await this.authService.refresh(req.headers.authorization.split('Bearer ')[1])
  }
}
