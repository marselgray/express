var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(path.join(__dirname, 'client')));


//routes
app.get('/', function(req, res){
    res.render('index');
});


//port 
app.listen(3000, function(){
    console.log('yo server running, so dope.')
})
