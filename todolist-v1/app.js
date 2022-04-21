const express = require("express");
const bodyParser = require("body-parser");
// Calling the customize module i.e., date.js
const date = require(__dirname + "/date.js");

const app = express();
// Creating global items array so that it will accessible to both GET & POST Method
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
// this .set() is due to EJS -> Embedded JavaScript
app.set("view engine", "ejs");
// this bodyParser is used by POST Method in order to use the value of input pass by user to the browser & then the browser sends the
// value to the server for processing
app.use(bodyParser.urlencoded({
  extended: true
}));
// Telling express explicitly to serve up the local files store inside public folder
app.use(express.static("public"));

// GET Method is used to handle the request raise by browser to server when user routes to homepage("/")
app.get("/", function(req, res) {
  // Getting the date data from customize module where date is current module(app.js) variable
  const day = date.getDate();
  // EJS, this res.render() sends the data as output to the browser & all the variable which will get dynamic value should be
  // pass in single res.render() & each variable name should be same as mention in list.ejs
  res.render("list", {
    ListTitle: day,
    newListItems: items
  });

});


// POST Method is used to handle the data send by browser to the server for processing
app.post("/", function(req, res) {
  // Grabing the value or data(i.e., user input) from browser into server(app.js) using bodyParser
  const item = req.body.newItem;
  // Comparing the button name
  if(req.body.list === "Work"){
    workItems.push(item);
    // Here we can't write res.render as it'll cause error so redirecting the item var to GET Method
    res.redirect("/work");
  } else{
    items.push(item);
    // Here we can't write res.render as it'll cause error so redirecting the item var to GET Method
    res.redirect("/");
  }

});


//  GET Method for /work
app.get("/work", function(req, res) {
  res.render("list", {
    ListTitle: "Work List",
    newListItems: workItems
  });
});


// GET Method for about page
app.get("/about", function(req, res){
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is up at port 3000");
});
