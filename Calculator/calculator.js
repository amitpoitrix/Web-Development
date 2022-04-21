const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// bodyParser is used by express & whenever we want to post the HTML form info to the server, than urlencoded will be used in order to
// render that info by the server. use below code every single time you want to use bodyParser
// why bodyParser becoz it allows us go into any of the routes
app.use(bodyParser.urlencoded({extended : true}));

// port where server will run
const port = 3000;

// get() & post() method for index.html
// get() means to get info from server when homepage("/") loads up on browser
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// post() means to send info to the server in order to render it
app.post("/", (req, res) => {
  // req.body -> It is the parsed version of HTTP request & its like js object or look like json file so use . to access any fields
  // as it will return string so converting it to Number
  var n1 = Number(req.body.num1);
  var n2 = Number(req.body.num2);

  var result = n1 + n2;

  res.send("Your result is " + result);
});


// get() & post() method for index.html
app.get("/bmicalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
  // parseFloat() -> is used to get float no. from string
  var wt = parseFloat(req.body.weight);
  var ht = parseFloat(req.body.height);

  var bmi = wt / (ht * ht);

  res.send("Your BMI is " + bmi);
})

app.listen(port, () => {
  console.log("Server is running on port : " + port);
});
