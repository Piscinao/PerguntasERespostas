const express = require("express");
const app = express();

//motor html para uso ejs
app.set('view engine', 'ejs');

app.get("/", (req,res) => {
  var nome = "Henrique Jensen";
  var lang = "JavaScript";
  res.render("index", {
    nome: nome,
    lang: lang,
    empresa: "FireUX",
    inscritos: 8000
  });
});

app.listen(8080,()=> {
  console.log("App is running!");
});