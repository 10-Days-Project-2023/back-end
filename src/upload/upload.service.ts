import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService, private prisma: PrismaService) {}
  
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION')
  })

  async uploadProfilePic(userId: string, file: Express.Multer.File) {
    const fullFilePath: string = `10day-profilepic/${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fullFilePath,
        Body: file.buffer,
        ACL: 'public-read',
      }),
    );
    
    await this.prisma.user.update({
      where:{userId: userId,},
      data:{
        picture: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fullFilePath}`,
      },
    })
    return ({ message: "success uploading..." });
  }

  async getProfilePicBase64(userId: string){
    const userInfo = await this.prisma.user.findUnique({
      where:{userId: userId,},
    });
    return userInfo.picture;
  }
}
