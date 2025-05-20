import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { KategoriyaService } from './kategoriya.service';
import { CreateKategoriyaDto } from './dto/create-kategoriya.dto';
import { UpdateKategoriyaDto } from './dto/update-kategoriya.dto';
import { ID } from 'src/common/types/type';

@Controller('kategoriya')
export class KategoriyaController {
  constructor(
    @Inject("IKategoryaService") 
    private readonly kategoriyaService: KategoriyaService
  ){}

  @Post()
  create(@Body() createKategoriyaDto: CreateKategoriyaDto) {
    return this.kategoriyaService.create(createKategoriyaDto);
  }

  @Get()
  findAll() {
    return this.kategoriyaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ID) {
    return this.kategoriyaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ID, @Body() updateKategoriyaDto: UpdateKategoriyaDto) {
    return this.kategoriyaService.update(id, updateKategoriyaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ID) {
    return this.kategoriyaService.delete(id);
  }
}
