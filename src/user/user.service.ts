import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './tools';
import { Roles } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }

  async getUserRoles(userId: string) {
    return await this.prisma.user.findUnique({
      where: { userId },
      select: { roles: true },
    });
  }

  async validateUserRole(userId: string, includes: Roles[], denied?: Roles[]) {
    const roles = await this.getUserRoles(userId);
    console.log(roles);
    return roles.roles.some(
      (r) => includes.includes(r) && !denied?.includes(r),
    );
  }

  async getMyGame(userId: string) {
    const games = await this.prisma.user.findUnique({
      select : {
        ownedGameIds : true
      },
      where : {
        userId : userId
      }
    })

    return games;
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId
      }
    })
    if (!user) throw new ForbiddenException('Credentials incorrect');
    return user;
  }
}
