const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////////// Requesting All Articles ///////////////////////////

// As route location is same for all the RESTful API Method i.e., GET, POST, DELETE we'll use express app.route()
// that will help us in chaining all the method which belongs to same route
// app.route("/articles").get().post().delete();
app.route("/articles")
// Setting up our First GET Route "/articles" which will fetch all the articles
.get(function(req, res){
  // Fetching all articles from database
  Article.find(function(err, foundArticle){
    if(!err){
      res.send(foundArticle);
    } else{
      res.send(err);
    }
  });
})
// Handling POST request which is made through Postman
.post(function(req, res){
  // Now storing the data which we're getting from Client in the database
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  // while saving the docs we can have callback function inside save() method so as to send response to client
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully saved the Article!");
    } else{
      res.send(err);
    }
  });
})
// Now Handling the DELETE Request from Browser on "/articles" route
.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all the Articles");
    } else{
      res.send(err);
    }
  });
});

///////////////////////////////////////// Requesting Specific Articles ///////////////////////////
// Creating Dynamic common route
app.route("/articles/:articleTitle")
  .get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if(foundArticle){
        res.send(foundArticle);
      } else{
        res.send("There is no article present with the name you have mention");
      }
    });
  })
  // To update whole document i.e., all fields value use PUT
  .put(function(req, res){
    // Model.update() is deprecated so using updateOne() without {overwrite: true}
    Article.updateOne(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      // {overwrite: true},
      function(err, result){
        if(!err){
          res.send("Successfully updated");
        }
      });
  })
  // Now using PATCH to update specific article specific field
  .patch(function(req, res){
    Article.updateOne(
      {title: req.params.articleTitle},
      // this $set flag will enable us to update only the specific field value
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully Updated");
        } else{
          res.send(err);
        }
      });
  })
  // Now deleting the specific article
  .delete(function(req, res){
    Article.deleteOne(
      {title: req.params.articleTitle},
      function(err){
        if(!err){
          res.send("Successfully deleted");
        } else{
          res.send(err);
        }
      });
  });



app.listen(3000, function(){
  console.log("Server started at port 3000");
});
