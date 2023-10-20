import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { RegisterModule } from './register/register.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GoogleModule,
    RegisterModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TIME') },
      }),
    }),
  ],
  providers: [UserService],
  exports: [JwtModule],
})
export class AuthModule {}
