import { 
  Delete,  
  Get,  
  Param,  
  Post, 
  UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/register/tools'
import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@GetUser() user: User){
    return user.cartedGameIds;
  }

  @Post("/:id")
  updateCart(@GetUser() user: User, @Param('id') gameId: string) {
    return this.cartService.updateCart(user, gameId);
  }

  @Post("/purchase")
  purchase(@GetUser() user: User) {
    return this.cartService.purchase(user);
  }

  @Delete("/:id")
  deleteCart(@GetUser() user: User, @Param('id') gameId: string){
    return this.cartService.deleteCart(user, gameId);
  }
}
