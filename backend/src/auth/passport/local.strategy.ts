import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.ValidateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Email or password is correct !");
    }
    if(user.isActive === false){
      throw new BadRequestException("Acount isn't active ! ")
    }
    return user;
  }
}