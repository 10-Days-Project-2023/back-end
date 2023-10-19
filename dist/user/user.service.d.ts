import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './tools';
import { Roles } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(userId: string, dto: EditUserDto): Promise<{
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
    getUserRoles(userId: string): Promise<{
        roles: import(".prisma/client").$Enums.Roles[];
    }>;
    validateUserRole(userId: string, includes: Roles[], denied?: Roles[]): Promise<boolean>;
}
