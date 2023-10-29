import { Body, Controller, FileTypeValidator, Get, HttpStatus, Param, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/register/tools';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  async getProfilePicBase64(@GetUser('userId') userId: string) {
    return this.uploadService.getProfilePicBase64(userId);
  }

  @Post('profilepic')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileSubsecMultifile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('userId') userId: string
  ) {
    return this.uploadService.uploadProfilePic(userId, file);
  }

  @Post('game/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') gameId: string
  ) {
    return this.uploadService.uploadGame(gameId, file);
  }

  @Post('update/:id')
  async updatePic(@Param('id') gameId:string, @Body() pic: string[]){
    return this.uploadService.updatePic(gameId, pic);
  }
}
