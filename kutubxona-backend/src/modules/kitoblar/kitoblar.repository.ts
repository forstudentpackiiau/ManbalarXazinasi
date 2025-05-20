import { IKitolarRepository } from "./interface/kitoblar.repository";
import { Kitoblar } from "./entities/kitoblar.entity";
import { CreateKitoblarDto } from "./dto/create-kitoblar.dto";
import { InjectModel } from "@nestjs/sequelize";
import { ID } from "src/common/types/type";
import { UpdateKitoblarDto } from "./dto/update-kitoblar.dto";

export class KitoblarRepository implements IKitolarRepository {
    constructor(
        @InjectModel(Kitoblar)
        private kitoblarModel: typeof Kitoblar
      ) {}
    async name(nomi: string): Promise<Kitoblar | null> {
        const data = await this.kitoblarModel.findOne({
            where:{nomi}
        })
        return data
    }
    async findOne(id: ID): Promise<Kitoblar | null> {
        const data = await this.kitoblarModel.findOne({
            where:{id}
        })
        return data
    }
    async update(id: ID, dto: UpdateKitoblarDto): Promise<Kitoblar | null> {
        await this.kitoblarModel.update(dto, {where:{id}})
        return this.findOne(id)
    }
    async delete(id: ID): Promise<void> {
        await this.kitoblarModel.destroy({where:{id}})
    }
    async findAll(): Promise<Array<Kitoblar>> {
        const data = await this.kitoblarModel.findAll()
        return data
    }
    async create(dto: CreateKitoblarDto): Promise<Kitoblar> {
        const data = await this.kitoblarModel.create({...dto})
        return data
    }
}