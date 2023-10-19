import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleOauthGuard, GoogleStrategy } from './tools';
import { JwtAuthGuard, JwtStrategy } from '../register/tools'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [GoogleController],
  providers: [
    GoogleService,
    JwtAuthGuard, 
    GoogleOauthGuard, 
    JwtStrategy, 
    GoogleStrategy, 
    JwtService
  ],
})
export class GoogleModule {}