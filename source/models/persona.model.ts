import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface PersonaI{
    idPersona?: number | null;
    nombre: string;
    apellido: string;
    nacimiento: Date;
    email: string;
    direccion:string;
    telefono:string;
    genero:string;
    foto:string;
    credencial:string;
}

@Table(
    {
        tableName: "persona",
        timestamps: true
    }
)
class Persona extends Model implements PersonaI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    idPersona?: number
    
    @AllowNull(false)
    @NotEmpty
    @Column
    nombre!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    apellido!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    nacimiento!: Date;

    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    direccion!: string;

    
    @AllowNull(false)
    @NotEmpty
    @Column
    telefono!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    genero!: string;
    
    @AllowNull(false)
    @NotEmpty
    @Column
    foto!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    credencial!: string;

}
export default Persona;