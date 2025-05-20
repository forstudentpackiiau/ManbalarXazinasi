import { ResData } from "src/lib/resData";
import { CreateKitoblarDto } from "../dto/create-kitoblar.dto";
import { Kitoblar } from "../entities/kitoblar.entity";
import { ID } from "src/common/types/type";
import { UpdateKitoblarDto } from "../dto/update-kitoblar.dto";

export interface IKitoblarService {
    create(dto:CreateKitoblarDto):Promise<ResData<Kitoblar>>
    findAll():Promise<ResData<Kitoblar[]>>
    findOne(id:ID):Promise<ResData<Kitoblar | null>>
    update(id:ID, dto:UpdateKitoblarDto):Promise<ResData<Kitoblar | null>>
    delete(id:ID):Promise<ResData<Kitoblar | null>>
    name(nomi:string):Promise<void>
}