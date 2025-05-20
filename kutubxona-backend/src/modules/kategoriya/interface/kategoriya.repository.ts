import { ID } from "src/common/types/type";
import { CreateKategoriyaDto } from "../dto/create-kategoriya.dto";
import { Kategoriya } from "../entities/kategoriya.entity";
import { UpdateKategoriyaDto } from "../dto/update-kategoriya.dto";

export interface IKategoriyaRepository {
    findAll():Promise<Array<Kategoriya>>
    create(dto:CreateKategoriyaDto):Promise<Kategoriya>
    findOne(inventar_raqam:ID):Promise<Kategoriya | null>
    delete(inventar_raqam:ID):Promise<void>
    update(inventar_raqam:ID, dto:UpdateKategoriyaDto):Promise<Kategoriya | null>
    name(nomi:string):Promise<Kategoriya | null>
}