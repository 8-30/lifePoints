import { Model, Table, Column, AllowNull, NotEmpty, PrimaryKey } from "sequelize-typescript";
import Persona from "./persona.model";

export interface EmpleadoI{
    idEmpleado ?: number | null;
    empresa: string;
    tarifa: number;
    calificacion: number;
    descripcion: string;
    enable: boolean;
    nombreServicio:string;
    persona: Persona
}

@Table(
    {
        tableName: "empleado",
        timestamps: true
    }
)
class Empleado extends Model implements EmpleadoI{
    
    @PrimaryKey
    @Column
    idEmpleado ?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    empresa!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    tarifa!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    calificacion!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    nombreServicio!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    descripcion!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    enable!: boolean;

    persona!: Persona;

}
export default Empleado;