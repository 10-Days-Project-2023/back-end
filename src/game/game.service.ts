import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './tools';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}
  
  async createGame(userId: string, dto: CreateGameDto) {
    const game = await this.prisma.game.create({
      data: {
        ...dto,
      },
    });

    return game;
  }

}
