
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/",function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  var k = req.body.longurl;
  if(k.length>0){
    var apiurl = "https://is.gd/create.php?format=simple&url="+k;
    request(apiurl, { json: true }, (err, response, body) => {
      if (!err && response.statusCode==200){
        res.render("success", {surl:body});
      }
      else if (err || response.statusCode!=200) {
        res.render("failure");
      }
});
  }
  else {
    res.redirect("/");
  }
});

app.listen(process.env.PORT || 3000 , function () {
  console.log("port 3000 activated...");
});
