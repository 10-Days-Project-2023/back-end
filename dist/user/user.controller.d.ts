import { UserService } from './user.service';
import { EditUserDto } from './tools';
import { User } from '@prisma/client';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): {
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
    };
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
}
