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
/*
app.post('/api/user/login', userController.login);      //Login
app.post('/api/user/register', userController.register);      //Registo - será put para o XML
app.post('/api/user/addUnseen/:id', userController.addUnseen);  //Add movie with id to unseen list
app.delete('/api/user/removeUnseen/:id', userController.removeUnseen);  //Remove movie with id from unseen list
app.post('/api/user/addSeen/', userController.addSeen);         //Add movie with id (and can have rating/comment) to seen list
app.put('/api/user/updateSeen/', userController.updateSeen);    //Update rating/comment from a movie with id
app.get('/api/user/getUnseen', userController.getUnseen);
app.get('/api/user/getSeen', userController.getSeen);*/


// Movies ================================================================================ //
//app.get('/api/movie/:id', movieController.get);				      //	 Get a Movie by ID (field)   //
app.get('/api/movie/', movieController.list); 				        //   Get a Movie by a param / all movies   //

/*
user:
    login
registo
pesquisar filme
guardar filme numa lista
passar filme para outra lista - comentar/rating
remover filme de lista "a ver"
editar comentario/rating*/