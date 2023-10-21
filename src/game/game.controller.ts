import { 
  Body, 
  Controller, 
  Post, 
  UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/register/tools'
import { GameService } from './game.service';
import { CreateGameDto } from './tools';
import { GetUser } from '../auth/auth.decorator';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  editUser(@GetUser('userId') userId: string, @Body() dto: CreateGameDto) {
    return this.gameService.crateGame(userId, dto);
  }
}