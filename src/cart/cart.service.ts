import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async updateCart(user: User, gameId: string){
    user.cartedGameIds.push(gameId);

    const updateUserCart = await this.prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        cartedGameIds: user.cartedGameIds,
      },
    });

    return updateUserCart;
  }

  async deleteCart(user: User, gameId: string) {
    const updateUserCart = await this.prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        cartedGameIds: user.cartedGameIds.filter((id) => id !== gameId),
      },
    });

    return updateUserCart;
  }
}
