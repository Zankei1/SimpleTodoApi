import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";
import { InitialMigration1656593110875 } from "./migrations/1656593110875-InitialMigration";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "test",
    entities: 
    [
        Todo
    ],
    migrations: 
    [
        InitialMigration1656593110875
    ],
});

appDataSource.initialize();