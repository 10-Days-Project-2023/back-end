import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UploadService } from '../../upload/upload.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './tools';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService, 
    JwtStrategy,
    JwtService,
    UploadService,
  ]
})
export class RegisterModule {}