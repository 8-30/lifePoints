import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface OrdenI{
    idOrden?: number | null;
    idOrdenEmpleado?: number | null;
    fecha_orden: Date;
    fecha_agenda: Date;
    pago: string;
    estado: boolean;
    tiempo: number;
    total: number;
    localizacion: string;
    //empleado: Empleado;

}

@Table(
    {
        tableName: "orden",
        timestamps: true
    }
)
class Orden extends Model implements OrdenI{

    @AutoIncrement
    @PrimaryKey
    @Column
    idOrden?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    idOrdenEmpleado?: number

    @AllowNull(false)
    @NotEmpty
    @Column   
    fecha_orden!: Date;

    @AllowNull(false)
    @NotEmpty
    @Column   
    fecha_agenda!: Date;

    @AllowNull(false)
    @NotEmpty
    @Column   
    pago!: string;

    @AllowNull(false)
    @NotEmpty
    @Column   
    estado!: boolean;

    @AllowNull(false)
    @NotEmpty
    @Column   
    tiempo!: number;

    @AllowNull(false)
    @NotEmpty
    @Column   
    total!: number;

    @AllowNull(false)
    @NotEmpty
    @Column   
    localizacion!: string;

    /*@AllowNull(false)
    @NotEmpty
    @Column   
    emplead!: Empleado;*/
    

}
export default Orden;