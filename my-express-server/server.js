const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res){
  res.send("<h1>Hello Sorr</h1>");
})

app.get("/contact", function(req, res){
  res.send("Contact me at : amit@amit.com")
})

app.get("/about", function(req, res){
  res.send("Hey Everyone I'm amit currently working at infosys")
})

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Coding</li> <li>Watching Movies</li></ul>")
})

app.listen(port, () => {
  console.log("Server started on port :" + port);
})
