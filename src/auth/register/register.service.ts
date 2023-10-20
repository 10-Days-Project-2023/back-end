import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SigninDto, SignupDto, JwtPayload } from './tools';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class RegisterService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}

  async signup(dto: SignupDto) {
    // generate the password hash
    dto.hash = await argon.hash(dto.hash);

    try{
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        }
      }).then((data) => {
        if(data) throw new ForbiddenException('Credentials taken');
      })

      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          provider: 'register',
          ...dto
        },
      });
      
      // return the saved user
      return this.signToken({
        sub: user.userId, 
        email: user.email,
      })
    } catch(error){
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    // sign the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    if(!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    // if password incorrect throw exception
    if(!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // send back the user
    return this.signToken({
      sub: user.userId, 
      email: user.email,
    })
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
}