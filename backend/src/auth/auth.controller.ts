import { Body, Controller, Get, Post,Request,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public, ResponseMessage } from '@/decorator/customize';
import { CheckAuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private readonly mailerService: MailerService) {}
  @Post("login")
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Fetch login")
  handleLogin(@Request() req){
    return this.authService.Login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Post('register')
  Register(@Body() RegisterDto:CreateAuthDto) {
    return this.authService.handleRegister(RegisterDto)
  }
  
  @UseGuards(JwtAuthGuard)
  @Public()
  @Post('check-code')
  CheckCode(@Body() registerDto:CheckAuthDto) {
    return this.authService.checkCode(registerDto)
  }

  @Public()
  @Get('testmail')
  testMail() {
    this.mailerService
    .sendMail({
      to: 'trantuan135798@gmail.com', // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      template:"register",
      context:{
        name:"Tuan",
        activationCode:12345678

      }
    })
    .then(() => {})
    .catch(() => {});
    return "Ok"
  }


  
}