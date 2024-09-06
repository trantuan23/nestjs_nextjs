import { UsersService } from '@/modules/users/users.service';
import { ComparhashPasswordHelper } from '@/utils/helper';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService:JwtService) {}

  async ValidateUser(username: string,pass:string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await ComparhashPasswordHelper(pass,user.password)
    if(!user || !isValidPassword) return null
    return user
  }

  async Login(user:any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
   
  }

  handleRegister = async(registerDto:CreateAuthDto)=>{
    return await this.usersService.handleRegister(registerDto)
  }


}