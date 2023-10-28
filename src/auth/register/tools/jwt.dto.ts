import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SigninDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class SignupDto{
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
    @IsOptional()
    picture?: string

    @IsString()
    @IsOptional()
    github?: string
}