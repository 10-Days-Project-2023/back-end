import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGameDto, EditGameDto, GetGameByGenreDto } from "./tools";
import { User, genre } from "@prisma/client";
import { randomInt } from "crypto";

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async createGame(userId: string, dto: CreateGameDto) {
    // turn creator username to userId
    console.log(dto);
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
    if (!creators || (creators.length != dto.createdUsernames.length)) throw new ForbiddenException('Credentials incorrect');
    
    delete dto.createdUsernames;
    // create game to db
    const game = await this.prisma.game.create({
      data: {
        ...dto,
        createdUsers: {
          connect: creators
        }
      },
    });

    return game;
  }

  async editGame(userId: string, gameId: string, dto: EditGameDto) {
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
        gameId : gameId
      },
      data: {
        ...dto,
        createdUsers : {
          set: creators
        }
      }
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

  async getTopTen() {
    const unsorted = await this.prisma.game.findMany();
    
    const sorted = unsorted.sort((a,b) => {
      return (b.sale * b.price) - (a.sale * a.price);
    })

    return sorted.slice(0,10);
  }

  async getRandomGame() {
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

  async getRandomGameByMember(user: User) {
    const allRandomGame = [];
    for (const genreName of Object.values(genre)) {
      const filteredGame = await this.prisma.game.findMany({
        where: {
          genres: {
            has: genreName
          },
          NOT: {
            gameId: {
              in: user.ownedGameIds,
            },
          },
        },
        take: 10,
      });
      allRandomGame.push({
        "genre": genreName,
        "games": filteredGame
      });
    }
    return allRandomGame;
  }

  async getGameById(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { gameId: id },
    });

    return game;
  }
}