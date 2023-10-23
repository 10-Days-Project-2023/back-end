import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_REGION')
    })

    constructor(private readonly configService: ConfigService, private prisma: PrismaService) {}


    async uploadProfilePic(fileName: string, file: Buffer, userId: string){

        const fullFilePath: string = `10day-profilepic/${fileName}`;

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fullFilePath,
                Body: file,
            }),
        );

    }
}
