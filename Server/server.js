var express             = require('express'),
    app                 = express(),
    movieController     = require('./controllers/movie-controller'),
    userController      = require('./controllers/user-controller');



var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server api listening at http://%s:%s', host, port);

});


// Users ================================================================================ //

app.post('/api/user/login', userController.login);      //Login
app.post('/api/user/register', userController.register);      //Registo - será put para o XML


app.post('/api/user/addUnseen/:id', userController.addUnseen);  //Add movie with id to unseen list                                  -addMovieToSeeList ok
app.delete('/api/user/removeUnseen/:id', userController.removeUnseen);  //Remove movie with id from unseen list                     -removeMovieToSeeList ok
app.post('/api/user/addSeen/:id', userController.addSeen);         //Add movie with id (and can have rating/comment) to seen list   -moveToSeenList ok


app.put('/api/user/updateSeen/:id', userController.updateSeen);    //Update rating/comment from a movie with id                        -updateSeen


app.get('/api/user/getUnseen/:id', userController.getUnseen);       //Get unseen movie list from user with id
app.get('/api/user/getSeen/:id', userController.getSeen);           //Get seen movie list from user with id


// Movies ================================================================================ //
app.get('/api/movie/:id', movieController.get);				      //	 Get a Movie by ID (field)   //                 -getMovieById ok
app.get('/api/movie/', movieController.list); 				        //   Get a Movie by a param / all movies   //       -getMovieByTitle / -getGenreMovies ok

/*
user:
    login
registo
pesquisar filme
guardar filme numa lista
passar filme para outra lista - comentar/rating
remover filme de lista "a ver"
editar comentario/rating*/