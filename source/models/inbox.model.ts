import { Model, Table, Column, AllowNull, NotEmpty, PrimaryKey, AutoIncrement } from "sequelize-typescript";

export interface InboxI{
    idInbox ?: number | null;
    persona1  ?: number | null;
    persona2: number;
    nombre: string;

}

@Table(
    {
        tableName: "inbox",
        timestamps: true
    }
)

class Inbox extends Model implements InboxI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    idInbox ?: number
    

    @Column
    persona1 ?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    persona2!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    nombre!: string



}
export default Inbox;