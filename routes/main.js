module.exports = function(app)
{	

   const { check, validationResult } = require('express-validator');

     const redirectLogin = (req, res, next) => {
     	if (!req.session.userId ) {
     	res.redirect('./login')
   	} else { next (); }
     }


     //takes user to the index.html page
     app.get('/',function(req,res){
        res.render('index.html')
     });

     //takes users to the about page 
     app.get('/about',function(req,res){
        res.render('about.html');
    });

	// takes users to the search.html page
	 app.get('/search',function(req,res){
         res.render("search.html");

     });
	
	//This will be called when the user clicks the submit button inside the search webpage
    	 app.get('/search-result', function(req, res) {
     	 var MongoClient = require('mongodb').MongoClient;
 	 var url = 'mongodb://localhost'; //url for where mongodb is located
    	  MongoClient.connect(url, function (err, client) {
     	 if (err) throw err;
     	 var db = client.db('fooddb');//searches through the fooddb database
     	 db.collection('food').find().toArray((findErr, results) => { //its looking through the books collection inside the fooddb database 
     	 if (findErr) throw findErr;//finds errors
     	 else
         res.render('search-result.ejs', {availablefood:results});//renders search.ejs and links it with the results of availablefood
     	 client.close();//closes the client
 	 });
	});
	});




//takes the user to the register.html page 
  app.get('/register', function (req,res) {
         res.render('register.html');
     });
	//this is called when the user clicks the submit button when on the register.html webpage
     	app.post('/registered',[check('email').isEmail()] ,check('password').isLength(8,15), function (req,res) {
	
	const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.redirect('./register'); }
	
	else{
	
       	const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const plainPassword = req.sanitize(req.body.password);
        
	

      	//saving in to database
      	 var MongoClient = require('mongodb').MongoClient;
      	 var url2 = 'mongodb://localhost';//url for where mongodb is located
       	MongoClient.connect(url2, function(err, client) {
       	 if (err) throw err;
       	 var db = client.db ('listusersdb');//searches through the listusersdb database

    	bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword)
        {                                                                                         
        	// Store hashed password in your database.
        	res.send('You have now registered, Your user name is: '+ req.body.name + ' your password is: '+ 
		req.body.password +' and your hashed password is: '+ hashedPassword + '     ' + '<br />'+'<a href='+'./'+'>Home</a>');                                                                                     
	});

        db.collection('users').insertOne({
        first: req.body.first, //inserts first name into the database
        last: req.body.last, //inserts last name into the database
        email: req.body.email, //inserts email into the database
        name: req.body.name, //inserts username into the database
        password: req.body.password //inserts password into the database
        });
        client.close();//closes the client
        });
	}
	
       });
 

	//renders the addbook.html 
        app.get('/addfood', redirectLogin,function(req,res){
                 res.render('addfood.html');
         });

	//this is called when the user clicks the submit button when on the addfood.html webpage
       app.post('/foodadded', redirectLogin,function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost'; //url for where mongodb is located

       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('fooddb'); //searches through the foodpdb database
        db.collection('food').insertOne({ //inserts these into the food collection inside fooddb
        name: req.body.name, //adds name
        typicalValue: req.body.typicalValue, //adds typical value
	unit: req.body.unit, //adds typical value's unit
	calories: req.body.calories, //adds calories
	carbs: req.body.carbs, //adds carbs
	fat: req.body.fat, //adds fat
	protein: req.body.protein, //adds protien
	salt: req.body.salt, //adds salt
	sugar: req.body.sugar //adds sugar
        });
        client.close(); //closes the client
        res.send(' This Food is added to the database, name: '+ req.body.name + '  ' 
	+ ' Typical value per: ' + req.body.typicalValue + '  '
	+ ' Unit of the Typical Value: ' + req.body.unit + '  ' 
	+ ' calories: ' + req.body.calories + ' kilocalories  '
	+ ' carbs: ' + req.body.carbs + ' g  '  
	+ ' fat: ' + req.body.fat + ' g ' 
	+ ' protein: ' + req.body.protein + ' g '
	+ ' salt: ' + req.body.salt + ' g ' 
	+ ' sugar: ' + req.body.sugar + ' g '        
	+ '<br />'+'<a href='+'./'+'>Home</a>'); 
	//sends an onscreen message saying the book has been added to the database, also allows the users to retrun home
        });
       });



      app.get('/listfood', function(req, res) {

      var MongoClient = require('mongodb').MongoClient;
      var url2 = 'mongodb://localhost'; //url for where mongodb is located
      MongoClient.connect(url2, function (err, client) {
      if (err) throw err; //displays error if it occurs
      var db = client.db('fooddb'); //searches through the foodsdb database
      db.collection('food').find().toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
      res.render('listfood.ejs', {availablefood:results}); //renders listfood.ejs and links it with the results of availablefood
      client.close(); //closes the client
  });
});
});




app.get('/login', function (req,res) {

         res.render('login.html');

      });

      app.post('/loggedin', function (req,res) {

	/*
	var MongoClient = require('mongodb').MongoClient;
        var url = 'mongodb://localhost'; //url for where mongodb is located


       MongoClient.connect(url, function(err, client) {

        if (err) throw err;
        var db = client.db ('listusersdb');//searches through the listusersdb database 


	db.collection('users').find({name:req.body.name}).toArray((findErr, results) => {
	
	if (results == true) //only allows user1 to log in
	{
     
        req.session.userId = req.body.name; 
	res.send('Login successful, You are now logged in, Welcome '+ req.body.name  +  '<br />'+'<a href='+'./'+'>Home</a>');
	  
	}*/
	
	 if (req.body.name == 'user1')
	{
        
        req.session.userId = req.body.name; 
	res.send('Login successful, You are now logged in, Welcome '+ req.body.name  +  '<br />'+'<a href='+'./'+'>Home</a>');
	  
	}

      	else{res.send('Login unsuccessful, wrong username' +  '<br />'+'<a href='+'./'+'>Home</a>');}

//});
//});
});


app.get('/logout', redirectLogin, (req,res) => {

     req.session.destroy(err => {

     if (err) {

       return res.redirect('./')

     }

     res.send('you are now logged out. <a href='+'./'+'>Home</a>');

     })

   })



        //renders the updatefood.html
        app.get('/updatefood', redirectLogin,function(req,res){
                 res.render('updatefood.html');
         });

	 app.get('/updatefoodform', redirectLogin,function(req,res){
                 res.render('updatefoodform.html');
         });

        //this is called when the user clicks the submit button when on the updatefood.html webpage
       app.post('/findingfood', redirectLogin,function (req,res) {
	 var MongoClient = require('mongodb').MongoClient;
         var url = 'mongodb://localhost'; //url for where mongodb is located
          MongoClient.connect(url, function (err, client) {                                                                                                                                                                 if (err) throw err;
         
	var db = client.db('fooddb');//searches through the fooddb database
        name: req.body.name //remove name
	
	db.collection('food').find().toArray((findErr, results) => { //its looking through the books collection inside the fooddb database
         if (findErr)
	{ 	
	res.send(' The Food '+ req.body.name +  ' doesnt exist, return home '  +  '<br />'+'<a href='+'./'+'>Home</a>'); //tells the user what food has been removed from the database	
	throw findErr;//finds errors
	}

	
         else
	 {
		db.collection('food').removeOne({name: req.body.name});
         	res.send( 'click the link to update ' + req.body.name +' (if its not in the database it will add it instead)' +  ' '+'<a href='+'/updatefoodform'+'>Click Here!</a>')
		//res.render('updatefoodform.html');
      	 }
	
	
	    client.close();//closes the client
         });
	                                       
        });
       });




        //this is called when the user clicks the submit button when on the updatefoodform.html webpage
       app.post('/foodupdated', redirectLogin,function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost'; //url for where mongodb is located

       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('fooddb'); //searches through the foodpdb database
        db.collection('food').insertOne({ //inserts these into the food collection inside fooddb
        name: req.body.name, //adds name
        typicalValue: req.body.typicalValue, //adds typical value
        unit: req.body.unit, //adds typical value's unit
        calories: req.body.calories, //adds calories
        carbs: req.body.carbs, //adds carbs
        fat: req.body.fat, //adds fat
        protein: req.body.protein, //adds protien
        salt: req.body.salt, //adds salt
        sugar: req.body.sugar //adds sugar
        });
        
        res.send(' This Food is updated to the database, name: '+ req.body.name + '  '
        + ' Typical value per: ' + req.body.typicalValue + '  '
        + ' Unit of the Typical Value: ' + req.body.unit + '  '
        + ' calories: ' + req.body.calories + ' kilocalories  '
        + ' carbs: ' + req.body.carbs + ' g  '
        + ' fat: ' + req.body.fat + ' g '                                                                                                                                                                                  + ' protein: ' + req.body.protein + ' g '
        + ' salt: ' + req.body.salt + ' g '
        + ' sugar: ' + req.body.sugar + ' g '
        + '<br />'+'<a href='+'./'+'>Home</a>');
        client.close(); //closes the client
        });
       });






//this will load when the user clicks the submit button from the updatefood.html webpage 
  app.post('/foodremoved', redirectLogin,function (req,res) {                                                                                                                                                                 
      //saving in to database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost'; //locates the url for the database

       MongoClient.connect(url, function(err, client) {

        if (err) throw err;
        var db = client.db ('fooddb'); //searches through the foodsdb database
        db.collection('food').removeOne({ 
        name: req.body.name,//remove name
	typicalValue: req.body.typicalValue, //remove typical value
        unit: req.body.unit, // remove typical value's unit
        calories: req.body.calories, // remove calories
        carbs: req.body.carbs, // remove carbs
        fat: req.body.fat, // remove fat
        protein: req.body.protein, // remove protien
	salt: req.body.salt, // remove salt
	sugar: req.body.sugar // remove sugar

        });
	
	db.collection('food').removeOne({name: req.body.name});
        res.send(' The Food '+ req.body.name +  ' has been removed from the database '  +  '<br />'+ '<a href='+'./'+'>home</a>' );

	client.close(); //closes the client 
	
        });
       });



 
                                                               


app.get('/api', function (req,res) {
     var MongoClient = require('mongodb').MongoClient;
     var url = 'mongodb://localhost';
     MongoClient.connect(url, function (err, client) {
     if (err) throw err                                                                                                                                                
     var db = client.db('fooddb');                                                                                                                                                                   
      db.collection('food').find().toArray((findErr, results) => {                                                                                                                                
      		if (findErr) throw findErr;
      		else	
		{
         	res.json(results);
	//	res.send('<br />'+'<a href='+'./'+'>Home</a>');
		}                                                                                                                                              
      		client.close();                                                                                                                                                   

});
});
});                                                                                                    









 
}
