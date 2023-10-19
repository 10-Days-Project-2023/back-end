import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export type JwtPayload = {
    sub: string;
    email: string;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
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
export {};
