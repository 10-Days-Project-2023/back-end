import { Controller, FileTypeValidator, HttpStatus, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/register/tools';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePic(@UploadedFile(
        new ParseFilePipeBuilder()
          .addFileTypeValidator({
            fileType: /(jpg|jpeg|png|gif)$/,
          })
          .addMaxSizeValidator({ maxSize: 5242880 })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          }),
      ) file: Express.Multer.File, @GetUser('userId') userId: string) {
        await this.uploadService.uploadProfilePic(file.originalname, file.buffer, userId);
    }
}
