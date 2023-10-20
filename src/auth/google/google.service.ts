import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { generateFromEmail } from 'unique-username-generator';
import { RegisterUserDto } from './tools';
import { JwtPayload } from '../register/tools';

@Injectable()
export class GoogleService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}

  async signIn(user: RegisterUserDto): Promise<{ access_token: String }> {
    if (!user) 
      throw new BadRequestException('Unauthenticated');
    
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      }
    });
    
    if (!userExists) 
      return await this.registerUser(user);
    
    return this.signToken({
      sub: userExists.userId, 
      email: userExists.email,
    })
  }

  async registerUser(user: RegisterUserDto): Promise<{ access_token: String }>  {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...user,
        }
      })

      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          username: generateFromEmail(user.email, 5),
        }
      })

      return this.signToken({
        sub: newUser.userId, 
        email: newUser.email,
      })
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async signToken(payload: JwtPayload): Promise<{ access_token: String }> {
    
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_TIME,
      secret: process.env.JWT_SECRET,
    })

    return {
      access_token: token
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) return null;
    return user;
  }
}