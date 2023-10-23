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
import { genre } from '@prisma/client';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

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

  @Get('genre')
  getGamesByGenre(@Body() dto: GetGameByGenreDto) {
    return this.gameService.getGamesByGenre(dto);
  }

  @Get(':id')
  getGameById(@Param('id') id : string) {
    return this.gameService.getGameById(id);
  }

  
}