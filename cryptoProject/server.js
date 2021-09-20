// server.js

// init project
var express = require("express");
var app = express();
var axios = require("axios");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/app/index.html");
});

app.get("/prices", function(request, response) {
  axios
    .get("https://api.nomics.com/v1/prices?key=340c4cb835f12bfe74b18f642c6a264345f86926" + process.env.NOMICS_API_KEY)
    .then(resp => {
      response.send(resp.data);
    })
    .catch(err => {
      console.log("Error fetching data from nomics", err);
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});