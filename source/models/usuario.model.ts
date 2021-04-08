import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";
import Persona from "./persona.model";

export interface UsuarioI{
    idUsuario?: number | null;
    calificacion: number;
    enable: boolean;
    persona: Persona;
}

@Table(
    {
        tableName: "usuario",
        timestamps: true
    }
)
class Usuario extends Model implements UsuarioI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    idUsuario?: number
    
    @AllowNull(false)
    @NotEmpty
    @Column
    calificacion!: number

    @AllowNull(false)
    @NotEmpty
    @Column
    enable!: boolean;

    persona!: Persona;
}
export default Usuario;