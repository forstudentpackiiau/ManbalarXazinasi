import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateKategoriyaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nomi:string
}
