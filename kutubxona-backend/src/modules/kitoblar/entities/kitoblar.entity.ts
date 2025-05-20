import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({ tableName: 'kitoblar' })
export class Kitoblar extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    nomi: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    izoh: string;

    @Column({ type: DataType.STRING, allowNull: false})
    inventar_raqam: string;

    @Column({ type: DataType.STRING, allowNull: false })
    kitob_tili: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    soni: number;

    @Column({ type: DataType.STRING, allowNull: false })
    muallif: string;

    @Column({ type: DataType.STRING, allowNull: false })
    kategoriya: string;

    @Column({ type: DataType.STRING, allowNull: true })
    sohasi: string;

    @Column({ type: DataType.STRING, allowNull: false })
    stilaj: string;

    @Column({ type: DataType.STRING, allowNull: true })
    rasm: string;

    @Column({ type: DataType.STRING, allowNull: true })
    kitob_file: string;

    @Column({ type: DataType.STRING, allowNull: true })
    nashr_etilgan_yili: string;

    @Column({ type: DataType.STRING, allowNull: true })
    nashriyot: string;

    @Column({ type: DataType.STRING, allowNull: true })
    shahar: string;
}
