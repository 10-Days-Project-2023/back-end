import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGameDto, EditGameDto, GetGameByGenreDto } from "./tools";
import { genre } from "@prisma/client";

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async createGame(userId: string, dto: CreateGameDto) {
    // turn creator username to userId
    const creators = await this.prisma.user.findMany({
      select : {
        userId : true
      },
      where : {
        username : {
          in: dto.createdUsernames
        }
      }
    });
    
    // create game to db
    const game = await this.prisma.game.create({
      data: {
        gameName: dto.gameName,
        price: dto.price,
        picture: dto.picture,
        genres: dto.genres,
        createdUsers: {
          connect: creators
        }
      },
    });

    return game;
  }

  async editGame(userId: string, dto: EditGameDto) {
    const creators = await this.prisma.user.findMany({
      select : {
        userId : true
      },
      where : {
        username : {
          in: dto.createdUsernames
        }
      }
    });

    const game = await this.prisma.game.update({
      where: {
        gameId : dto.gameId
      },
      data: {
        gameName: dto.gameName,
        price: dto.price,
        picture: dto.picture,
        genres: dto.genres,
        createdUsers : {
          set: creators
        }
      }
    });

    return game;
  }

  async getGameById(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { gameId: id },
    });

    return game;
  }

  async getGamesByGenre(dto: GetGameByGenreDto) {
    const games = await this.prisma.game.findMany({
      where: {
        genres : {
          has: dto.genre
        }
      }
    });

    return games;
  }
}
