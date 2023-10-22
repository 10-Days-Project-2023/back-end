import { Optional } from "@nestjs/common";
import { genre } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    gameName: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    picture: string[];
    
    @IsNotEmpty()
    genres: genre[];

    @IsString()
    @IsNotEmpty()
    createdUsernames: string[];
}

export class GetGameByGenreDto {
    @IsNotEmpty()
    genre: genre;
}

export class EditGameDto {
    @IsString()
    @IsNotEmpty()
    gameId: string;

    @IsString()
    @Optional()
    gameName: string;

    @IsNumber()
    @Optional()
    price: number;

    @IsString()
    @Optional()
    picture: string[];
    
    @Optional()
    genres: genre[];

    @IsString()
    @Optional()
    createdUsernames: string[];
}