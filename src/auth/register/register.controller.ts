import {
  Body, 
  Controller, 
  HttpCode, 
  HttpStatus, 
  Get,
  Post 
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { SigninDto, SignupDto } from './tools';

@Controller('auth/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.registerService.signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.registerService.signin(dto)
  }
}