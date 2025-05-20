import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:"kategoriya"})
export class Kategoriya extends Model{
    @Column({ type: DataType.STRING, allowNull: false})
    nomi:string
}
