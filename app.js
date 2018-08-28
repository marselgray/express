var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('express', ['users'])
var ObjectId = mongojs.ObjectId

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

    req.checkBody('book_title', 'Book Title is Required').notEmpty();
    req.checkBody('author_Name', 'Author\'s Name is Required').notEmpty();
    req.checkBody('subject', 'Subject is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        db.users.find(function (err, users) {
        res.render('index', {
            title: 'Books I\'ve Read',
            users: users,
            errors: errors
        });
    })
    } else {
        var newUser = {
            book_title: req.body.book_title,
            author_Name: req.body.author_Name,
            subject: req.body.subject
        }
        db.users.insert(newUser, function(err, result){
            if(err){
                console.log(err);
            } res.redirect('/');
        });
    }
});


app.delete('/users/delete/:id', function(req, res){
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err){
            console.log(err)
        }
        res.redirect('/');
    });
});



//port 
app.listen(3000, function(){
    console.log('yo server running, so dope.')
})
