import { 
  Body, 
  Controller, 
  Get, 
  Patch, 
  UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/register/tools'
import { UserService } from './user.service';
import { EditUserDto } from './tools';
import { GetUser } from '../auth/auth.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')  
  getMe(@GetUser() user: User) {
   return user;
  }

  @Patch()
  editUser(@GetUser('userId') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Get('myGame')
  @UseGuards(JwtAuthGuard)
  getMyGame(@GetUser('userId') userId: string) {
    return this.userService.getMyGame(userId);
  }
}