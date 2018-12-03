
var express = require("express");

var path = require("path");

var session = require('express-session');

var app = express();

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res){
  req.session.counter += 1;
  res.render('index', {counter: req.session.counter});
});

app.get('/reset', function (req, res){
  req.session.counter = 0;
  res.render('index', {counter: req.session.counter});
});

app.get('/two', function (req, res){
  req.session.counter += 2;
  res.render('index', {counter: req.session.counter});
});

app.post('/', function(req, res) {
 console.log("POST DATA", req.body);
 res.redirect('/');
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
