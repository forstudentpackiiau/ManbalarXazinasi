import { ResData } from "src/lib/resData"
import { Kategoriya } from "../entities/kategoriya.entity"
import { CreateKategoriyaDto } from "../dto/create-kategoriya.dto"
import { ID } from "src/common/types/type"
import { UpdateKategoriyaDto } from "../dto/update-kategoriya.dto"

export interface IKategoriyaService {
    findAll():Promise<ResData<Kategoriya[]>>
    create(dto:CreateKategoriyaDto):Promise<ResData<Kategoriya>>
    findOne(inventar_raqam:ID):Promise<ResData<Kategoriya | null>>
    delete(inventar_raqam:ID):Promise<ResData<void>>
    update(inventar_raqam:ID, dto:UpdateKategoriyaDto):Promise<ResData<Kategoriya | null>>
    name(nomi:string):Promise<void>
}