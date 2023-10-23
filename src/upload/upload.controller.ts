import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
        new ParseFilePipe({
            validators: [
                //new MaxFileSizeValidator({ maxSize: 1000}),
                //new FileTypeValidator({ fileType: 'image/png'}),
            ],
        }),
    ) file: Express.Multer.File, @GetUser('userId') userId: string) {
        await this.uploadService.uploadProfilePic(file.originalname, file.buffer, userId);
    }
}
