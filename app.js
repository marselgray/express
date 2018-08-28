var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('express', ['users'])

var app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Global Variables
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

//Set static path
app.use(express.static(path.join(__dirname, 'client')));

//Express Validator Middleware from Docs
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//routes
app.get('/', function(req, res){
    db.users.find(function(err, docs){
        console.log(docs);
        res.render('index', {
            title: 'Books I\'ve Read',
            users: docs,
        });
    })
});

app.post('/users/add', function(req, res){

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Books I\'ve Read',
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        db.users.insert(newUser, function(err, result){
            if(err){
                console.log(err);
            } res.redirect('/');
        });
    }
});


app.delete('/users/delete/:id', function(req, res){
    console.log(req.params.id);
});



//port 
app.listen(3000, function(){
    console.log('yo server running, so dope.')
})
