import { Inject, Injectable } from '@nestjs/common';
import { CreateKategoriyaDto } from './dto/create-kategoriya.dto';
import { UpdateKategoriyaDto } from './dto/update-kategoriya.dto';
import { KategoriyaRepository } from './kategoriya.repository';
import { IKategoriyaService } from './interface/kategoriya.service';
import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { Kategoriya } from './entities/kategoriya.entity';
import { KategoriyaMavjudligi, KategoriyaNomi } from './exception/error';

@Injectable()
export class KategoriyaService implements IKategoriyaService{
  constructor(
    @Inject("IKategoryaRepository")
    private readonly kategoriyaRepository:KategoriyaRepository
  ){}


  async name(nomi: string): Promise<void> {
    const data = await this.kategoriyaRepository.name(nomi)

    if(data){
      throw new KategoriyaNomi()
    }
  }


  async findAll(): Promise<ResData<Kategoriya[]>> {
    const data = await this.kategoriyaRepository.findAll()
    const resdata = new ResData<Kategoriya[]>(200, "barcha kategoriyalar",data )
    return resdata
  }


  async create(dto: CreateKategoriyaDto): Promise<ResData<Kategoriya>> {
    await this.name(dto.nomi)
    const data = await this.kategoriyaRepository.create(dto)
    const resdata = new ResData<Kategoriya>(201, "kategoriya yaratildi", data)
    return resdata
  }


  async findOne(id: ID): Promise<ResData<Kategoriya | null>> {
    const data = await this.kategoriyaRepository.findOne(id)

    if(!data){
      throw new KategoriyaMavjudligi()
    }

    const resdata = new ResData<Kategoriya>(200, "malumot olindi", data)
    return resdata
  }


  async delete(id: ID): Promise<ResData<void>> {
    await this.findOne(id)
    await this.kategoriyaRepository.delete(id)
    const resdata = new ResData<null>(200, "kategoriya ochirildi", null)
    return resdata
  }


  async update(id: ID, dto: UpdateKategoriyaDto): Promise<ResData<Kategoriya | null>> {
    const data = await this.kategoriyaRepository.update(id, dto)
    const resdata = new ResData<Kategoriya>(200, "KATEGORIYA YANGILANDI", data)
    return resdata
  }


}
