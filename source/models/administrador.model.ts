import { Model, Table, Column, AllowNull, NotEmpty, PrimaryKey } from "sequelize-typescript";
import Persona from "./persona.model";

export interface AdministradorI{
    idAdministrador ?: number | null;
    persona: Persona
   
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
    
    persona!: Persona;

}
export default Administrador;