var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'base'
    
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    } else {
        console.log('Connected!:)');
    }
});  

 
global.db = connection;
 
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 

// app.get('/about', function(req, res){

// res.sendFile(path.join(__dirname,'about.html'));



// });

// app.get('/services', function(req, res){

//     res.sendFile(path.join(__dirname,'services.html'));
    
    
    
// });

// app.get('/team', function(req, res){

//         res.sendFile(path.join(__dirname,'team.html'));
        
        
        
// });


app.get('/', routes.index);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', user.login);
app.post('/login', user.login);
app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile',user.profile);
app.listen(3000)
