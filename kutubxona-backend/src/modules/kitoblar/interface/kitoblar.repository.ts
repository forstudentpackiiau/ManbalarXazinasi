import { ID } from "src/common/types/type";
import { CreateKitoblarDto } from "../dto/create-kitoblar.dto";
import { Kitoblar } from "../entities/kitoblar.entity";
import { UpdateKitoblarDto } from "../dto/update-kitoblar.dto";

export interface IKitolarRepository {
    create(dto:CreateKitoblarDto):Promise<Kitoblar>
    findAll():Promise<Array<Kitoblar>>
    findOne(id:ID):Promise<Kitoblar | null>
    update(id:ID, dto:UpdateKitoblarDto):Promise<Kitoblar | null>
    delete(id:ID):Promise<void>
    name(nomi:string):Promise<Kitoblar | null>
}