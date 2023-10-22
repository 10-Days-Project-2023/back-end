import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}
    
    async getCart(userId: string){
        const userInfo = await this.prisma.user.findUnique({
            where: {
                userId: userId,
            },
        });

        return userInfo.cartedGameIds;
    }

    async updateCart(userId: string, gameId: string){
        const userInfo = await this.prisma.user.findUnique({
            where: {
                userId: userId,
            },
        });

        userInfo.cartedGameIds.push(gameId);

        const updateUserCart = await this.prisma.user.update({
            where: {
                userId: userId,
            },
            data: {
                cartedGameIds: userInfo.cartedGameIds,
            },
        });

        return updateUserCart;
    }

    async deleteCart(userId: string, gameId: string){
        const userInfo = await this.prisma.user.findUnique({
            where: {
                userId: userId,
            },
        });
        
        const updateUserCart = await this.prisma.user.update({
            where: {
                userId: userId,
            },
            data: {
                cartedGameIds: userInfo.cartedGameIds.filter((id) => id !== gameId),
            },
        });

        return updateUserCart;
    }
}
