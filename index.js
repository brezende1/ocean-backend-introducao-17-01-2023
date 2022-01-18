const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
// const url = "mongodb+srv://admin:hd2rV5duoPrrIi3t@cluster0.jup2c.mongodb.net/";

const dbName = "ocean_database_18_01_2022";

async function main() {
    // Conexão com o Banco de Dados

    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    const collection = db.collection("heroes");

    // Aplicação em Express

    const app = express();

    // Sinalizo para o Express que o body das requisições
    // estará sempre estruturado em JSON
    app.use(express.json());

    // Endpoint "/"
    app.get("/", function (req, res) {
        res.send("Hello, World!");
    });

    // Endpoint "/oi"
    app.get("/oi", function (req, res) {
        res.send("Olá, mundo!");
    });

    const list = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
    //              0                   1                2

    // [GET] "/heroes" - Read All (Ler todos os registros)
    app.get("/heroes", async function (req, res) {
        const documentos = await collection.find().toArray();

        res.send(documentos);
    });

    // [GET] "/heroes/:id" - Read Single (by Id) (Ler um registro pelo ID)
    app.get("/heroes/:id", async function (req, res) {
        const id = req.params.id;

        const item = await collection.findOne({ _id: new ObjectId(id) });

        res.send(item);
    });

    // [POST] "/heroes" - Create (Criar um registro)
    app.post("/heroes", async function (req, res) {
        const item = req.body;

        await collection.insertOne(item);

        res.send(item);
    });

    // [PUT] "/heroes/:id" - Update (Atualizar um registro)
    app.put("/heroes/:id", async function (req, res) {
        const id = req.params.id;

        const item = req.body;

        await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: item,
            }
        );

        res.send(item);
    });

    // [DELETE] "/heroes/:id" - Delete (Remover um registro)
    app.delete("/heroes/:id", async function (req, res) {
        const id = req.params.id;

        await collection.deleteOne({ _id: new ObjectId(id) });

        res.send("Item removido com sucesso.");
    });

    app.listen(3000);
}

main();
