const express = require("express");
// https is native node module & is used to get the data through API from external server
const https = require("https");
// In order to get the input from client side to server we use body-parser
const bodyParser = require("body-parser");


const app = express();
// for body-parser used by express
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const cityName = req.body.city;
  const appKey = "7cfaa79bb4c1d1e85739005a1f8bfb24";
  const unit = "metric";
  // Taking data from external server using API
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appKey + "&units=" + unit;
  // get request to external server
  https.get(url, function(response){
    // printing response status code in console
    console.log(response.statusCode);
    // fetching the data
    response.on("data", function(data){
      // converting the data in JSON format & parse it to convert it into JS object data format
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDesc = weatherData.weather[0].description;
      console.log(weatherDesc);
      // for images
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      // use write to wrap up multiple response
      res.write("<p>The Weather is " + weatherDesc + " <p>");
      res.write("<h1>The Temperature of " + cityName + " is " + temp + " degrees celcius</h1>");
      res.write("<img src= " + imageURL + " >");
      // use send to send response all at once
      res.send();
      // const object = {
      //   name : "Amit",
      //   favouriteDevice : "Mac"
      // }
      // // so this JSON.stringify(obj) works opposite as of parse(data)
      // console .log(JSON.stringify(object));
    });

  });

});




app.listen(3000, function(){
  console.log("Server is running at port : 3000");
})
