import { Controller, Post,Request,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req){
    return req.user
  }
  
}