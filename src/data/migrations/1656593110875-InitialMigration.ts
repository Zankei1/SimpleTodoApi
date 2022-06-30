import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class InitialMigration1656593110875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "todo",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "is_completed",
                        type: "number"
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("todo");
    }
}
