import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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
        const fullFilePath: string = `10day-profilepic/${file.originalname}`;

        const uploadResult: any = await this.s3Client.send(
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
                // picture: this.getProfilePicBase64(userId),
                picture: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fullFilePath}`,
            },
        })
        return console.log('success uploading...');
    }

    async getProfilePicBase64(userId: string){
        const userInfo = await this.prisma.user.findUnique({
            where:{userId: userId,},
        });
        return userInfo.picture;
        // const profilePicKey: string = `10day-profilepic/${userId}`;
        // // const profilePicKey = profilePicUrl.slice(`https://${this.configService.get<string>('aws.s3_bucket_name')}.s3.${this.configService.get<string>('aws.region')}.amazonaws.com/`.length);
        // //const s3 = new AWS.S3();
        // const params = new GetObjectCommand({
        //     Bucket: process.env.AWS_S3_BUCKET_NAME,
        //     Key: profilePicKey,
        // });
        // const profilePic: any = await this.s3Client.send(params);
        // // console.log(profilePic.Body.toString('base64'));
        // return profilePic.toString('base64')
    }
}
