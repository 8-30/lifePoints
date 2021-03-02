import { Model, Table, Column, AllowNull, NotEmpty, PrimaryKey } from "sequelize-typescript";

export interface AdministradorI{
    idAdministrador ?: number | null;
    usuario: string;
    contrasena: string;
   
}

@Table(
    {
        tableName: "administrador",
        timestamps: true
    }
)
class Administrador extends Model implements AdministradorI{
    
    @PrimaryKey
    @Column
    idAdministrador ?: number

    
    @AllowNull(false)
    @NotEmpty
    @Column
    usuario!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    contrasena!: string;

}
export default Administrador;