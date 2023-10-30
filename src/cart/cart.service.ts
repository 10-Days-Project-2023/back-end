import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Game } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async updateCart(user: User, gameId: string) {
        // user.cartedGameIds.push(gameId);
        if (user.ownedGameIds.includes(gameId)) {
          throw new ForbiddenException('Already owned Game');
        }
        const updateUserCart = await this.prisma.user.update({
            where: {
                userId: user.userId,
            },
            data: {
                // cartedGameIds: user.cartedGameIds,
                cartedGameIds: {
                  push: gameId
                }
            },
        });

        return updateUserCart;
    }

    async purchase(user: User) {
        // Check enough bulb to purchase
        let total = 0;
        user.cartedGameIds.forEach(async (gameId) => {
            const game = await this.prisma.game.findUnique({
                where: { gameId },
            });
            total += game.price;
        });
        if (total > user.bulb) return { message: "Your Bulb is not enough." };

        await Promise.all(
            user.cartedGameIds.map(async (gameId) => {
                const game = await this.prisma.game.findUnique({
                    where: { gameId },
                });

                // Game
                await this.prisma.game.update({
                    where: { gameId: game.gameId },
                    data: { sale: game.sale + 1 },
                });

                // Game creators
                game.createdUserIds.forEach(async (userId) => {
                    const creator = await this.prisma.user.findUnique({
                        where: { userId },
                    });
                    await this.prisma.user.update({
                        where: { userId: userId },
                        data: {
                            bulb:
                                creator.bulb +
                                Math.floor(
                                    game.price / game.createdUserIds.length
                                ),
                        },
                    });
                });

                // Buyer update cart game
                await this.prisma.user.update({
                    where: { userId: user.userId },
                    data: {
                        ownedGames: {
                            connect: {
                                gameId: game.gameId,
                            },
                        },
                        cartedGameIds: [],
                    },
                });
            })
        );

        // Buyer update bulb
        await this.prisma.user.update({
            where: { userId: user.userId },
            data: {
                bulb: user.bulb - total,
                cartedGameIds: [],
            },
        });
        return { message: "Purchase complete." };
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

    async getCartGame(user: User) {
        const games = await this.prisma.game.findMany({
            where: {
                gameId: {
                    in: user.cartedGameIds,
                },
            },
        });
        return games;
    }
}
