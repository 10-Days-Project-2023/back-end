import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import AWS, { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_REGION')
    })

    constructor(private readonly configService: ConfigService, private prisma: PrismaService) {}

    async uploadProfilePic(userId: string, file: Express.Multer.File) {
        const userInfo = await this.prisma.user.findUnique({
            where: {
                userId: userId,
            },
        });

        const currentTime: Date = new Date();
        const fullFilePath: string = `10day-profilepic/${userId}`;

        const uploadResult: any = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fullFilePath,
                Body: file.buffer,
            }),
        );
       
        await this.prisma.user.update({
            where:{
                userId: userId,
            },
            data:{
                picture: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${userId}`,
            },
        })
        return console.log('success uploading...');

    }

    async getProfilePic(userId: string){
        const userInfo = await this.prisma.user.findUnique({
            where:{userId: userId,},
        });
        const profilePicUrl = userInfo.picture;
        const profilePicKey = profilePicUrl.slice(`https://${this.configService.get<string>('aws.s3_bucket_name')}.s3.${this.configService.get<string>('aws.region')}.amazonaws.com/`.length);
        const s3 = new AWS.S3();
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: profilePicKey,
        };
        const profilePic: any = s3.getObject(params);

        return {
            profilePicBase64: profilePic.toString('base64')
        }
    }
}
