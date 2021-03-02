import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface UsuarioI{
    idUsuario?: number | null;
    calificacion: number;
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


}
export default Usuario;