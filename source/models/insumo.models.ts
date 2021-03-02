import { Model, Table, Column, AllowNull, NotEmpty, PrimaryKey, AutoIncrement } from "sequelize-typescript";

export interface InsumoI{
    idInsumo ?: number | null;
    idInsumosEmpleado  ?: number | null;
    nombre: string;
    tarifa: number;
    descripcion: string;
}

@Table(
    {
        tableName: "insumos",
        timestamps: true
    }
)

class Insumo extends Model implements InsumoI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    idInsumo ?: number
    

    @Column
    idInsumosEmpleado ?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    nombre!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    tarifa!: number;


    @AllowNull(false)
    @NotEmpty
    @Column
    descripcion!: string;

}
export default Insumo;