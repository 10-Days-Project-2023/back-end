import { IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsString()
    @IsOptional()
    hash?: string;

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    picture?: string;
}