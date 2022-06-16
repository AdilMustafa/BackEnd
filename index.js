var express = require ('express')
var bodyParser= require ('body-parser')
var session = require ('express-session');
var validator = require ('express-validator');
const app = express()
const port = 8000
const expressSanitizer = require('express-sanitizer');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/fooddb"; //used to store food database
var url2 = "mongodb://localhost/listusersdb";// used to store user database

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Food Database created!"); //displays "Food database created" in the console
  db.close();
});

MongoClient.connect(url2, function(err, db) {
  if (err) throw err;
  console.log("List Users Database created!"); //displays "List Users database created"
  db.close();
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
                                                                                                                                                                                                                                
    secret: 'somerandomstuffs',
                                                                                                                                                                                                                                
    resave: false,
                                                                                                                                                                                                                                
    saveUninitialized: false,
                                                                                                                                                                                                                                
    cookie: {
                                                                                                                                                                                                                                
        expires: 600000                                                                                                                                                                                                         
                                                                                                                                                                                                                                
    }
                                                                                                                                                                                                                                
}));
app.use(expressSanitizer());

// new code added to your Express web server
require('./routes/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//////////////
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


////////////



