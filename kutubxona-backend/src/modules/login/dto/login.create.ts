import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    parol:string
}