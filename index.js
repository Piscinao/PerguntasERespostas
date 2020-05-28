const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw: true, order:[
      ['id','DESC'] //ASC = Crescente
     // ['titulo','ASC'] // ordem alfabetica
    ]}).then(perguntas => {
    console.log(perguntas);
    res.render("index", {
      perguntas, perguntas
    });
  });
  //select all *from perguntas

 
});

app.get("/perguntar", (req,res) => {

  res.render("perguntar");
 
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

 

});

app.get("/pergunta/:id", (req, res) => { 
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){//Encontrou
      //encontra as respostas da pergunta id igual
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
    }).then(respostas => {
      res.render("pergunta", {
        pergunta: pergunta,
        //respostas pesquisadas passa para a
        respostas: respostas
      });
    });

    }else{//Não encontrou
      res.redirect("/");
    }
  });
})



app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
    //redireciona para a pagina da pergunta
  }).then(() =>{
    res.redirect("/pergunta/" + perguntaId);
  });
});

app.listen(8080,()=> {
  console.log("App is running!");
});