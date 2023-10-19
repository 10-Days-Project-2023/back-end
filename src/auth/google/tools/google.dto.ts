import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterUserDto{
    @IsString()
    @IsNotEmpty()
    provider: string

    @IsString()
    @IsNotEmpty()
    providerId: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    hash: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    picture: string     
}