const express = require("express");
const app = express();

//motor html para uso ejs
app.set('view engine', 'ejs');

app.get("/", (req,res) => {
  res.render("index")
});

app.listen(8080,()=> {
  console.log("App is running!");
});