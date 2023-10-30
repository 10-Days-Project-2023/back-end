import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Patch, 
  Post, 
  UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/register/tools'
import { GameService } from './game.service';
import { CreateGameDto, EditGameDto, GetGameByGenreDto } from './tools';
import { GetUser } from '../auth/auth.decorator';
import { User } from '@prisma/client';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('genre')
  getGamesByGenre(@Body() dto: GetGameByGenreDto) {
    return this.gameService.getGamesByGenre(dto);
  }

  @Get('topTen')
  getTopTen(){
    return this.gameService.getTopTen();
  }

  @Get('random')
  getRandomGame(){
    return this.gameService.getRandomGame();
  }

  @Get('randomByMember')
  @UseGuards(JwtAuthGuard)
  getRandomGameByMember(@GetUser() user: User){
    return this.gameService.getRandomGameByMember(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createGame(@GetUser('userId') userId: string, @Body() dto: CreateGameDto) {
    return this.gameService.createGame(userId, dto);
  }

  @Get(':id')
  getGameById(@Param('id') id : string) {
    return this.gameService.getGameById(id);
  }

  @Patch(':gameId')
  @UseGuards(JwtAuthGuard)
  editGame(@GetUser('userId') userId: string, @Param('gameId') gameId : string, @Body() dto: EditGameDto) {
    return this.gameService.editGame(userId, gameId, dto);
  }
}