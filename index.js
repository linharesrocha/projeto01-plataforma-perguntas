const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados!")
}).catch((msgErro) => {
    console.log(msgErro);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded ({extended: true}));
app.use(express.json())

app.get("/", (req, res) => {
    Pergunta.findAll({raw: true}).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
})

app.listen(8080, (error) => {
    error == true ? console.log("Deu ruim") : console.log("Servidor rodando!")
})