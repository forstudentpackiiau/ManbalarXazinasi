import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateKitoblarDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nomi:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    inventar_raqam:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    izoh:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kitob_tili:string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    soni:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    muallif:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kategoriya:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stilaj:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    rasm:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    kitob_file:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    nashr_etilgan_yili:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    nashriyot:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    sohasi:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    shahar:string
}
