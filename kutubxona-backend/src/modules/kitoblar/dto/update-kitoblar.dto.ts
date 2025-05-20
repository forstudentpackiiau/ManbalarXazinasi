import { PartialType } from '@nestjs/mapped-types';
import { CreateKitoblarDto } from './create-kitoblar.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateKitoblarDto extends PartialType(CreateKitoblarDto) {
    @ApiProperty()
    @IsOptional()
    @IsString()
    nomi:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    inventar_raqam:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    izoh:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    kitob_tili:string

    @ApiProperty()
    @IsOptional()
    @IsInt()
    soni:number

    @ApiProperty()
    @IsOptional()
    @IsString()
    muallif:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    kategoriya:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    shahar:string

    @ApiProperty()
    @IsOptional()
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
}
