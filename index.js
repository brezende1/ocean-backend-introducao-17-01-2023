const express = require("express");
const { redirect } = require("express/lib/response");
const app = express();

//Sinalizo para o Express que o body das requisições
// estará sempre estruturando em JSON
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello World!");
});

const list = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
//              0                   1               2

// [GET] "/heroes" - Read All (Ler todos os registros)
app.get("/heroes", function (req, res) {
    res.send(list.filter(Boolean));
});

//[GET] "/heroes/:id" - Read Single (by Id) (Ler um registro com id)
app.get("/heroes/:id", function (req, res) {
    const id = req.params.id - 1;

    const item = list[id];

    res.send(item);
});

//[POST] "/heroes" - Create (Criar um registro)
app.post("/heroes", function (req, res) { 
    const item = req.body;
    
    list.push(item.nome);

    res.send("Item adicionado com sucesso!");
});

//[PUT] "/heroes/:id" - Update (Atualizar um registro)
app.put("/heroes/:id", function (req, res) {
    const id = req.params.id - 1;

    const item = req.body;

    list[id] = item.nome;

    res.send("Item Atualizado com sucesso.");
});

// [DELETE] "/heroes/:id"" - Delete (Remover um registro)
app.delete("/heroes/:id", function (req, res) {
    const id = req.params.id - 1;
    
    delete list[id];
    
    res.send("ok");
});

app.listen(3000);
