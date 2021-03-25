import { Model, Table, Column, AllowNull, NotEmpty, PrimaryKey, AutoIncrement } from "sequelize-typescript";

export interface MensajeI{
    idMensaje ?: number | null;
    idInbox ?: number | null;
    idEmisor ?: number | null;
    estado: boolean;
    texto: string;

}

@Table(
    {
        tableName: "mensaje",
        timestamps: true
    }
)

class Mensaje extends Model implements MensajeI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    idMensaje ?: number
    

    @AllowNull(false)
    @NotEmpty
    @Column
    idInbox!: number

    @AllowNull(false)
    @NotEmpty
    @Column
    idEmisor!: number

    @AllowNull(false)
    @NotEmpty
    @Column
    estado!: boolean;

    @AllowNull(false)
    @NotEmpty
    @Column
    texto!: string;

}
export default Mensaje;