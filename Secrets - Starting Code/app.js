const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const encrypt = require("mongoose-encryption");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

hgchcc


// Using 'Secret String Instead of Two Keys' & 'Encrypt Only Certain Fields' to encrpt only password field
// from npm mongoose-encryption docs
const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = mongoose.model("User", userSchema);


// GET Method
app.get("/", function(req, res){
  res.render("home");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/login", function(req, res){
  res.render("login");
});


// POST Method
app.post("/register", function(req, res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err){
    if(err){
      console.log(err);
    } else{
      res.render("secrets");
    }
  });

});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  // As user have enter the username & password we'll check in our database whether its correct or not if correct than we'll
  // give access to secrets page
  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log(err);
    } else{
      if(foundUser){
        if(password === foundUser.password){
          res.render("secrets");
        }
      }
    }
  });

});


app.listen(3000, function(){
  console.log("Server started at Port 3000");
});
