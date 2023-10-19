import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserDto } from './tools';
import { JwtPayload } from '../register/tools';
export declare class GoogleService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    signIn(user: RegisterUserDto): Promise<{
        access_token: String;
    }>;
    registerUser(user: RegisterUserDto): Promise<{
        access_token: String;
    }>;
    signToken(payload: JwtPayload): Promise<{
        access_token: String;
    }>;
    findUserByEmail(email: string): Promise<{
        userId: string;
        provider: string;
        providerId: string;
        email: string;
        hash: string;
        username: string;
        picture: string;
        roles: import(".prisma/client").$Enums.Roles[];
        createdAt: Date;
        updatedAp: Date;
    }>;
}
