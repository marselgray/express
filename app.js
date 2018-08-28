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

var users = [
    {
        id: 1,
        first_name: 'Howdy',
        last_name: 'Bruh',
        email: 'howdybruh@gmail.com',
    },
    {
        id: 2,
        first_name: 'Broski',
        last_name: 'Dudeski',
        email: 'broskidudeski@gmail.com',
    },
    {
        id: 3,
        first_name: 'Bro',
        last_name: 'Dude',
        email: 'brodude@gmail.com',
    } 
]

//routes
app.get('/', function(req, res){
    res.render('index', {
        title: 'Customers',
        users: users,
    });
});

app.post('/users/add', function(req, res){
    console.log('Form Submitted');
})

//port 
app.listen(3000, function(){
    console.log('yo server running, so dope.')
})
