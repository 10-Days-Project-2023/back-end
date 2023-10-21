import { IsNumber, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    gameName: string;

    @IsNumber()
    price: number;
}