import { UsersService } from '@/modules/users/users.service';
import { ComparhashPasswordHelper } from '@/utils/helper';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService:JwtService) {}

  async signIn(username: string,pass:string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await ComparhashPasswordHelper(pass,user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException("Username/Password khong hop le !");
    }
    const payload = { sub: user._id, name: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
   
  }

  async ValidateUser(username: string,pass:string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await ComparhashPasswordHelper(pass,user.password)
    if(!user || !isValidPassword) return null
    return user
  }
}