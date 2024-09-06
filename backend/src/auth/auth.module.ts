import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Module({
  imports:[UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global:true,
        secret: configService.get<string>('JWT_SERECT'),
        signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED')
        },
      }),
      inject: [ConfigService],  
    }),
    PassportModule
    
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },]
})
export class AuthModule {}
