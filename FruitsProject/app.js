// Extracting the Mongoose Package
const mongoose = require("mongoose");

// Creating a server at port 27017 & also creating database if doesn't exist called fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB");

// Now creating fruitSchema that is required by the Mongoose
const fruitSchema = new mongoose.Schema({
  // field: schemaTypes
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// Now Creating Model Fruit that will reference fruitSchema with collection name as First parameter as we can write collection name in
// singular form(Fruit) & mongoose will automatically changes it into plural form(i.e., fruits)
const Fruit = mongoose.model("Fruit", fruitSchema);

// Now inserting data into fruit document using Fruit model
const guava = new Fruit({
  name: "Guava",
  rating: 5,
  review: "Good fruit"
});

// This will save(or INSERT) the new records(or document) every time you run below command   ₹
guava.save();

// UPDATE field data
// Fruit.updateOne({_id: "625d22a2f356f9662147cbd3"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully updated");
//   }
// });

// DELETE the doc or record
// Fruit.deleteOne({_id: "625d22a2f356f9662147cbd3"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted");
//   }
// });


// Now Creating new collection called Person & inserting data into it
// 1. Creating personSchema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

// 2. Creating Person Model
const Person = mongoose.model("Person", personSchema);

// 3. Creating person document
// const person = new Person({
//   name: "John",
//   age: "30",
//   favouriteFruit: pineapple
// });

// 4. Now saving(or INSERTing) it
// person.save();

// UPDATE
Person.updateOne({name: "John"}, {favouriteFruit: guava}, function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully updated");
  }
});

// DELETEing all docs from Person Model
// Person.deleteMany({name: "Vicky"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted all the docs");
//   }
// });

// INSERTing more fruits
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 8,
  review: "The best Fruit!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Too sour for me!"
});

const banana = new Fruit({
  name: "Banana",
  rating: "9",
  review: "Weird Texture"
});

// INSERTing many docs at a time using Fruit Model method insertMany(array, function(err){})
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

// find() method in Mongoose - READ
Person.find(function(err, fruits){
  if(err){
    console.log(err);
  } else{
    // As there is no error now we can close our server connection to database
    // mongoose.connection.close();

    fruits.forEach(function(element){
      console.log(element.name);
    });
  }
});
