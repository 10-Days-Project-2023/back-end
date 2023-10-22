import { 
    Body,  
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

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    getCart(@GetUser('userId') userId: string){
        return this.cartService.getCart(userId);
    }

    @Post("/:id")
    updateCart(@GetUser('userId') userId: string, @Param('id') gameId: string) {
        return this.cartService.updateCart(userId, gameId);
    }

    @Delete("/:id")
    deleteCart(@GetUser('userId') userId: string, @Param('id') gameId: string){
        return this.cartService.deleteCart(userId, gameId);
    }
}
