var express             = require('express'),
    app                 = express(),
    listController      = require('./controllers/list-controller'),
    movieController     = require('./controllers/movie-controller'),
    userController      = require('./controllers/user-controller');



var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server api listening at http://%s:%s', host, port);

});

// Movies ================================================================================ //

app.get('/api/movie', movieController.list); 				        //   Get all the Movies   //
app.post('/api/movie', movieController.create); 			      // 	   Create a Movie 	  //
app.delete('/api/movie/:id', movieController.delete);		    //     Delete a Movie 	  //
app.put('/api/movie/:id', movieController.update);   		    //     Update a Movie 	  //
app.get('/api/movie/:id', movieController.get);				      //	 Get a Movie by ID    //

// Users ================================================================================ //

app.get('/api/user', userController.list); 				        //   Get all the Users   //
app.post('/api/user', userController.create); 			      // 	   Create a User 	  //
app.delete('/api/user/:id', userController.delete);		    //     Delete a User 	  //
app.put('/api/user/:id', userController.update);   		    //     Update a User 	  //
app.get('/api/user/:id', userController.get);				      //	 Get a Movie by User    //

///////////////////////////
app.use(express.static('xml')); //ex: http://localhost:3000/imdb.xml -> abre imdb.xml

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
    res.send('CLAPPER restAPI');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

// Student ================================================================================ //
/*
app.get('/api/student', studentController.list); 				        //   Get all the Students   //
app.post('/api/student', studentController.create); 			      // 	   Create a Student 	  //
app.delete('/api/student/:id', studentController.delete);		    //     Delete a Student 	  //
app.put('/api/student/:id', studentController.update);   		    //     Update a Student 	  //
app.get('/api/student/:id', studentController.get);				      //	 Get a Student by ID    //
    */