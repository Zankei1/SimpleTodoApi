import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("todo")
export class Todo {
    
    @PrimaryColumn()
    id: string;    
    
    @Column()
    name: string;
    
    @Column()
    is_completed: number;
}
