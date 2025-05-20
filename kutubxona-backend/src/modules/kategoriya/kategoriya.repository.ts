import { ID } from "src/common/types/type";
import { CreateKategoriyaDto } from "./dto/create-kategoriya.dto";
import { UpdateKategoriyaDto } from "./dto/update-kategoriya.dto";
import { Kategoriya } from "./entities/kategoriya.entity";
import { IKategoriyaRepository } from "./interface/kategoriya.repository";
import { InjectModel } from "@nestjs/sequelize";

export class KategoriyaRepository implements IKategoriyaRepository {
    constructor(
        @InjectModel(Kategoriya)
        private readonly kategoriyaModel:typeof Kategoriya
    ){}
    async name(nomi: string): Promise<Kategoriya | null> {
        const data = await this.kategoriyaModel.findOne({
            where:{nomi}
        })

        return data
    }
    async findAll(): Promise<Array<Kategoriya>> {
        const data = await this.kategoriyaModel.findAll()
        return data
    }
    async create(dto: CreateKategoriyaDto): Promise<Kategoriya> {
        const data = await this.kategoriyaModel.create({...dto})
        return data
    }
    async findOne(id: ID): Promise<Kategoriya | null> {
        const data = await this.kategoriyaModel.findOne({
            where:{id}
        })
        return data
    }
    async delete(id: ID): Promise<void> {
        await this.kategoriyaModel.destroy({
            where:{id}
        })
    }
    async update(id: ID, dto: UpdateKategoriyaDto): Promise<Kategoriya | null> {
        await this.kategoriyaModel.update(dto,{
            where:{id}
        })

        return await this.findOne(id)
    }
    
}