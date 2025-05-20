import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateKategoriyaDto } from './create-kategoriya.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateKategoriyaDto extends PartialType(CreateKategoriyaDto) {
        @ApiProperty()
        @IsString()
        @IsOptional()
        nomi:string
}
