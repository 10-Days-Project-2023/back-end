import { Optional } from "@nestjs/common";
import { genre } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    gameName: string;

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @IsNotEmpty()
    genres: genre[];

    @IsNotEmpty()
    createdUsernames: string[];

    @IsNotEmpty()
    @IsString()
    github: string;
}

export class GetGameByGenreDto {
    @IsNotEmpty()
    genre: genre;
}

export class EditGameDto {
    @IsString()
    @Optional()
    gameName?: string;

    @IsString()
    @Optional()
    description?: string

    @IsNumber()
    @Optional()
    price?: number;
    
    @Optional()
    genres?: genre[];

    @Optional()
    createdUsernames?: string[];

    @Optional()
    @IsString()
    github: string;
}