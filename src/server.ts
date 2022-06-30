import "reflect-metadata";
import express from "express";
import { randomUUID } from "crypto";
import { appDataSource } from "./data";
import { Todo } from "./data/entities/Todo";
import cors from "cors";

const todosRepo = appDataSource.getRepository(Todo);

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}))

app.get("/todo", async (request, response) => {
    const todos = await todosRepo.find();
    response.status(200).json(todos);
});

app.post("/todo", async (request, response) => {

    const { name } = request.body;

    if (!name) {
        response.status(400).json({
            error: "Você deve enviar um nome para a tarefa"
        })
    }

    const todo = todosRepo.create({
        id: randomUUID(),
        name: name,
        is_completed: 0,
    });

    await todosRepo.save(todo);

    response.status(201).json(todo);
});

app.put("/todo/:id", async (request, response) => {
    const { id } = request.params;
    const { name, is_completed } = request.body;

    if (!id) {
        return response.status(400).json({
            error: "Você deve enviar o id da tarefa como parametro"
        });
    }

    const todo = await todosRepo.findOneBy({ id });

    if (!todo) {
        return response.status(400).json({
            error: "O id que voce enviou nao corresponse a uma tarefa"
        })
    }

    todo.name = name;
    todo.is_completed = is_completed;

    await todosRepo.save(todo);

    return response.status(200).json(todo);

});

app.delete("/todo/:id", async (request, response) => {

    const { id } = request.params;

    if (!id) {
        return response.status(400).json({
            error: "Você deve enviar o id da tarefa como parametro"
        });
    }

    const todo = await todosRepo.findOneBy({ id });

    if (!todo) {
        return response.status(400).json({
            error: "O id que voce enviou nao corresponse a uma tarefa"
        })
    }

    await todosRepo.remove(todo);

    return response.status(200).send();
});

app.listen(3333, () => console.log("Server rodando na porta 3333"));