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

  @Get(':id')
  getGameById(@Param('id') id : string) {
    return this.gameService.getGameById(id);
  }

  @Get('genre')
  getGamesByGenre(@Body() dto: GetGameByGenreDto) {
    return this.gameService.getGamesByGenre(dto);
  }

  @Get('top10')
  getTop10(){
    return this.gameService.getTop10();
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

  @Patch()
  @UseGuards(JwtAuthGuard)
  editGame(@GetUser('userId') userId: string, @Body() dto: EditGameDto) {
    return this.gameService.editGame(userId, dto);
  }
}