const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");

//Database

connection
  .authenticate()
  .then(() => {
    console.log("Connection works!");
  })
  .catch((msgError) => {
    console.log(msgError);
  });

//motor html para uso ejs
app.set('view engine', 'ejs');
//carregar arquivos estaticos
app.use(express.static('public'));

//app.use(express.urlencoded({ extended: true }));

//decodifica os dados enviados via formulário

app.use(bodyParser.urlencoded({extended: false}));
//permite ler dados json 
app.use(bodyParser.json());



//Rotas
app.get("/", (req,res) => {

  res.render("index");
 
});

app.get("/perguntar", (req,res) => {

  res.render("perguntar");
 
});


app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send("Formulário recebido! titulo " + titulo + " " + " descricao " + descricao );

});

app.listen(8080,()=> {
  console.log("App is running!");
});