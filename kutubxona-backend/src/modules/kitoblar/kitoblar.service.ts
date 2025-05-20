import { Inject, Injectable } from '@nestjs/common';
import { CreateKitoblarDto } from './dto/create-kitoblar.dto';
import { UpdateKitoblarDto } from './dto/update-kitoblar.dto';
import { IKitoblarService } from './interface/kitoblar.service';
import { ResData } from 'src/lib/resData';
import { Kitoblar } from './entities/kitoblar.entity';
import { KitoblarRepository } from './kitoblar.repository';
import { ID } from 'src/common/types/type';
import { InventarRaqam, KitoblarMavjudligi } from './exception/kitoblar.exception';

@Injectable()
export class KitoblarService implements IKitoblarService{
  constructor(
    @Inject('IKitoblarRepository')
    private readonly kitoblarRepository:KitoblarRepository
  ){}


  async name(nomi: string): Promise<void> {
    const data = await this.kitoblarRepository.name(nomi)

    if(data){
      throw new KitoblarMavjudligi()
    }
  }


  async findOne(id: ID): Promise<ResData<Kitoblar | null>> {
    const data = await this.kitoblarRepository.findOne(id)

    if(!data){
      throw new InventarRaqam()
    }

    const resdata = new ResData<Kitoblar>(200, "malumot olindi", data)
    return resdata
  }


  async update(id: ID, dto: UpdateKitoblarDto): Promise<ResData<Kitoblar | null>> {
    await this.findOne(id)
    const data = await this.kitoblarRepository.update(id, dto)
    const resdata = new ResData<Kitoblar>(200, "kitob malumotlari yangilandi", data)
    return resdata
  }


  async delete(id: ID): Promise<ResData<Kitoblar | null>> {
    await this.findOne(id)    
    await this.kitoblarRepository.delete(id)
    const resdata = new ResData<null>(200, "kitob malumoti ochirildi.", null)
    return resdata
  }

  
  async findAll(): Promise<ResData<Kitoblar[]>> {
    const data = await this.kitoblarRepository.findAll()
    const resdata = new ResData<Kitoblar[]>(200, "barcha kitoblar royxati", data)
    return resdata
  }


  async create(dto: CreateKitoblarDto): Promise<ResData<Kitoblar>> {
    await this.name(dto.nomi)
    const data = await this.kitoblarRepository.create(dto)
    const resdata = new ResData<Kitoblar>(201, "yangi kitob qo'shildi", data)
    return resdata
  }

}
