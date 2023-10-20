import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { GoogleService } from './google.service';
import { GoogleOauthGuard } from './tools';

@UseGuards(GoogleOauthGuard)
@Controller('auth/google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get()
  async auth() {}

  @Get('redirect')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.googleService.signIn(req.user);
    
    console.log(token);
    // return token;
    // res.cookie('access_token', token, {
    //   maxAge: 2592000000,
    //   sameSite: true,
    //   secure: false,
    // });

    return res.status(HttpStatus.OK);
  }
}