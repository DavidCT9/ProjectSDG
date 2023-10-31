const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.engine("ejs", require("ejs").renderFile);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.redirect('index');
});

app.get('/search', (req, res) => {
  const result = req.query.search.toLowerCase();
  if(result === 'home'){
    res.redirect('index');
  } else if(result === 'map'){
    res.redirect('map');
  } else if(result === 'more content'){
    res.redirect('more_content');
  } else{
    res.send('Pagina no encontrada, redirigiendo a HOME');
    res.redirect('index');
  }
});

app.get('/index', (req, res) => {
    res.render('index');
  });

app.get('/map', async (req, res) => {
  res.render('map');
});

app.get('/more_content', (req, res) => {
  res.render('more_content');
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send("There was an error in the app"); 
  });

app.listen(3000, () => {
    console.log("Listening to port 3000");
});