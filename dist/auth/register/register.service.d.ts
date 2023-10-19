import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SigninDto, SignupDto, JwtPayload } from './tools';
export declare class RegisterService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    signup(dto: SignupDto): Promise<{
        access_token: String;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: String;
    }>;
    signToken(payload: JwtPayload): Promise<{
        access_token: String;
    }>;
}
