const express = require("express");
const app = express();

//motor html para uso ejs
app.set('view engine', 'ejs');
//carregar arquivos estaticos
app.use(express.static('public'));

app.get("/", (req,res) => {

  res.render("index");
 
});

app.get("/perguntar", (req,res) => {

  res.render("perguntar");
 
});




app.listen(8080,()=> {
  console.log("App is running!");
});