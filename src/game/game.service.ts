import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGameDto, EditGameDto, GetGameByGenreDto } from "./tools";
import { genre } from "@prisma/client";
import { randomInt } from "crypto";

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

    // throw error when not found
    if (!creators) throw new ForbiddenException('Credentials incorrect');
    
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

  async getTop10() {
    const unsorted = await this.prisma.game.findMany();
    
    const sorted = unsorted.sort((a,b) => {
      return (b.sale * b.price) - (a.sale * a.price);
    })

    return sorted.slice(0,10);
  }

  async getRandomGame() {
    const countGame = await this.prisma.game.count();
    const skip = randomInt(countGame);

    const randomFieldIdx = randomInt(3);
    const orderField = ["gameId","gameName","price"][randomFieldIdx];

    const randomOrderIdx = randomInt(2);
    const orderDi = ["desc" , "asc"][randomOrderIdx];

    const allRandomGame = [];
    for (const genreName of Object.values(genre)) {
      const randomGameGenre = await this.prisma.game.findMany({
        where: {
          genres: {
            has: genreName
          }
        },
        take: 10,
        skip: skip,
        orderBy: {
          [orderField] : orderDi
        }
      })
      allRandomGame.push({
        "genre": genreName,
        "games": randomGameGenre
      });
    }
    
    return allRandomGame;
  }
}