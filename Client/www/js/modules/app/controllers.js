angular.module('starter.controllers', [])

//movies
    /*Controller para modificar a BD de filmes:
     get user comment
     get user rating
     search movies
     retrieve data

     */

//users
    /*Controller para modificar a BD dos users:
     regist/login
     add movie to list
     post rating
     post comment
     edit comment
     edit rating
     */


//pode-se retirar o lists, é estático
    //adicionar um user sempre fixo
.controller('ListsCtrl', function($scope, $http, $ionicModal, Lists, User) {
    $scope.toWatchMovies = [];
    $scope.watchedMovies = [];

    $scope.userId = User.getUserId();

    $scope.replyMessage = "";
    $scope.replyCode = 0;

    $scope.groups = [];
    $scope.groups[0] = {
        name: "To Watch",
        items: $scope.toWatchMovies
    }
    $scope.groups[1] = {
        name: "Watched",
        items: $scope.watchedMovies
    }

    $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function(u) {        
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

  $scope.loadLists = function(){
    $scope.getToWatchMovies();
    $scope.getWatchedMovies();
  }

        $scope.getToWatchMovies = function(){
            var url = 'http://localhost:3000/api/user/getUnseen/' + $scope.userId;
            
             $http.get(url).
            success(function(data, status, headers, config) {
                console.log(data);

                if(!data.status  && data.result) {
                    if (data.result.movie.length >= 1) {
                        for (var i = 0; i < data.result.movie.length; i++) {

                            movieToWatch = {};


                            movieToWatch.title = data.result.movie[i].title;
                            movieToWatch.movieId = data.result.movie[i].movieId;
                            movieToWatch.poster = data.result.movie[i].urlPoster;
                            movieToWatch.rating = data.result.movie[i].imdbRating;
                            movieToWatch.simplePlot = data.result.movie[i].simplePlot;
                            movieToWatch.appRating = data.result.movie[i].appRating;

                            movieToWatch.plot = data.result.movie[i].plot;
                            movieToWatch.year = data.result.movie[i].year;
                            movieToWatch.genres = data.result.movie[i].genres;
                            movieToWatch.actors = data.result.movie[i].actors;


                            movieToWatch.userComments = data.result.movie[i].userComments;

                            movieToWatch.show = true;
                            console.log('Movie nr:' + i + 'is;');
                            console.log(movieToWatch);

                            $scope.toWatchMovies.push(movieToWatch);
                        }
                    } else {
                        movieToWatch = {};


                        movieToWatch.title = data.result.movie.title;
                        movieToWatch.movieId = data.result.movie.movieId;
                        movieToWatch.poster = data.result.movie.urlPoster;
                        movieToWatch.rating = data.result.movie.imdbRating;
                        movieToWatch.simplePlot = data.result.movie.simplePlot;
                        movieToWatch.appRating = data.result.movie.appRating;

                        movieToWatch.plot = data.result.movie.plot;
                        movieToWatch.year = data.result.movie.year;
                        movieToWatch.genres = data.result.movie.genres;
                        movieToWatch.actors = data.result.movie.actors;


                        movieToWatch.userComments = data.result.movie.userComments;

                        movieToWatch.show = true;
                        console.log('Movie is;');
                        console.log(movieToWatch);

                        $scope.toWatchMovies.push(movieToWatch);
                    }
                }else{
                    movieToWatch = {};

                    movieToWatch.name = data.result._;
                    $scope.toWatchMovies.push(movieToWatch);
                }
            }).
                error(function(data, status, headers, config) {
            });
        }

        $scope.getWatchedMovies = function(){
            var url = 'http://localhost:3000/api/user/getSeen/' + $scope.userId;

            $http.get(url).
            success(function(data, status, headers, config) {
                console.log(data);

                if(!data.status  && data.result) {
                    if (data.result.movie.length >= 1) {
                        for (var i = 0; i < data.result.movie.length; i++) {

                            movie = {};


                            movie.title = data.result.movie[i].title;
                            movie.movieId = data.result.movie[i].movieId;
                            movie.poster = data.result.movie[i].urlPoster;
                            movie.rating = data.result.movie[i].imdbRating;
                            movie.simplePlot = data.result.movie[i].simplePlot;
                            movie.appRating = data.result.movie[i].appRating;

                            movie.plot = data.result.movie[i].plot;
                            movie.year = data.result.movie[i].year;
                            movie.genres = data.result.movie[i].genres;
                            movie.actors = data.result.movie[i].actors;


                            movie.userComments = data.result.movie[i].userComments;

                            movie.show = true;
                            console.log('Movie nr:' + i + 'is;');
                            console.log(movie);

                            $scope.watchedMovies.push(movie);
                        }
                    } else {
                        movie = {};


                        movie.title = data.result.movie.title;
                        movie.movieId = data.result.movie.movieId;
                        movie.poster = data.result.movie.urlPoster;
                        movie.rating = data.result.movie.imdbRating;
                        movie.simplePlot = data.result.movie.simplePlot;
                        movie.appRating = data.result.movie.appRating;

                        movie.plot = data.result.movie.plot;
                        movie.year = data.result.movie.year;
                        movie.genres = data.result.movie.genres;
                        movie.actors = data.result.movie.actors;


                        movie.userComments = data.result.movie.userComments;

                        movie.show = true;
                        console.log('Movie is;');
                        console.log(movie);

                        $scope.watchedMovies.push(movie);
                    }
                }else{
                    movie = {};

                    movie.name = data.result._;
                    $scope.watchedMovies.push(movie);
                }
            }).
                error(function(data, status, headers, config) {
            });
        }

        $scope.moveToSeen = function(userId, movieId, rating, comment){
            var url = 'http://localhost:3000/api/user/addSeen/' + $scope.userId + '?movieId=' + movieId + '?classification=' + rating + '?comment=' + comment;

            $scope.replyMessage = "";
            $scope.replyCode = 0;

            $http.get(url).
                success(function(data, status, headers, config) {
                    console.log(data);
                    if(data.status.$.code == "409"){//Movie already in one of the lists
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Movie already in one of the lists";
                    }else
                    if(data.status.$.code == "404"){//Movie not found

                    }else
                    if(data.status.$.code == "200"){//Movie added to list
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Movie seen";
                    }

                }).
                error(function(data, status, headers, config){
                    console.log('err');
                });

            $scope.loadLists()
        }

        $scope.removeFromUnseen = function(userId, movieId){
            var url = 'http://localhost:3000/api/user/removeUnseen/' + $scope.userId + '?movieId=';

            $scope.replyMessage = "";
            $scope.replyCode = 0;

            $http.delete(url).
                success(function(data, status, headers, config) {
                    console.log(data);
                    if(data.status.$.code == "409"){//Movie already in one of the lists
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Movie already in one of the lists";
                    }else
                    if(data.status.$.code == "404"){//Movie not found

                    }else
                    if(data.status.$.code == "200"){
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Movie removed from list";
                    }

                }).
                error(function(data, status, headers, config){
                    console.log('err');
                });

            $scope.loadLists()
        }

        $scope.updateRating_Comment = function(userId, movieId){
            var url = 'http://localhost:3000/api/user/removeUnseen/' + $scope.userId + '?movieId=';

            $scope.replyMessage = "";
            $scope.replyCode = 0;

            $http.put(url).
                success(function(data, status, headers, config) {
                    console.log(data);
                    if(data.status.$.code == "409"){
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Error on update";
                    }else
                    if(data.status.$.code == "404"){//Movie not found
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Movie not found";
                    }else
                    if(data.status.$.code == "200"){
                        $scope.replyCode = parseInt(data.status.$.code);
                        $scope.replyMessage = "Personal opinion updated";
                    }

                }).
                error(function(data, status, headers, config){
                    console.log('err');
                });
        }
})

.controller('AccountCtrl', function($scope, $http, User) {
        $scope.toWatchMovies = 0;
        $scope.watchedMovies = 0;
        $scope.userName = User.getUserName();
        $scope.userId = User.getUserId();

        $scope.replyMessage = "";
        $scope.replyCode = 0;

        $scope.loadLists = function(){
            $scope.getToWatchMovies();
            $scope.getWatchedMovies();
        }


        $scope.getToWatchMovies = function(){
            var url = 'http://localhost:3000/api/user/getUnseen/' + $scope.userId;

            $http.get(url).
                success(function(data, status, headers, config) {
                    console.log(data);

                    if(!data.status && data.result) {
                        if (data.result.movie.length >= 1) {
                            for (var i = 0; i < data.result.movie.length; i++) {
                                $scope.toWatchMovies++;
                            }
                        } else {
                            $scope.toWatchMovies++;
                        }
                    }
                }).
                error(function(data, status, headers, config) {
                });
        }

        $scope.getWatchedMovies = function(){
            var url = 'http://localhost:3000/api/user/getSeen/' + $scope.userId;

            $http.get(url).
                success(function(data, status, headers, config) {
                    console.log(data);

                    if(!data.status  && data.result) {
                        if (data.result.movie.length >= 1) {
                            for (var i = 0; i < data.result.movie.length; i++) {
                                $scope.watchedMovies++;
                            }
                        } else {
                            $scope.watchedMovies++;
                        }
                    }
                }).
                error(function(data, status, headers, config) {
                });
        }
})


.controller('HomeCtrl', function($scope, $stateParams, Chats) {

})

    //botão para adicionar filme a lista de unseen
.controller('SearchMoviesCtrl', function($scope, $http, Movie, User) {


    $scope.searchOpts = [
        {opt: 'title', optName: 'Movie Title'},
        {opt: 'actor', optName: 'Actor'},
        {opt: 'genre', optName: 'Genre'}
    ];

    $scope.selectedOpt = $scope.searchOpts[0];

    $scope.movies = [];
    $scope.comments = Movie.getComments();
    $scope.userId = User.getUserId();
    $scope.replyMessage = "";
    $scope.replyCode = 0;
    $scope.showMore = 1;


    $scope.searchMovieBy = function(movie, selectedOpt){
        console.log('Searching ' + movie.searchText + ' and ' + selectedOpt.opt);
        $scope.replyMessage = "";
        $scope.replyCode = 0;
        if(movie.searchText){
            $scope.getMovie(movie.searchText, selectedOpt.opt);
        }else{
            $scope.replyMessage = "Search can't be empty";
            $scope.replyCode = 1;
        }
        
            //http://www.myapifilms.com/imdb?title=Matrix&format=XML
    }

    $scope.getMovie = function(text, option){
        var url = 'http://localhost:3000/api/movie?' + option + '=' + text;

        $http.get(url).
            success(function(data, status, headers, config) {
                console.log(data);

                if(!data.status  && data.result) {
                    if (data.result.movie.length >= 1) {
                        for (var i = 0; i < data.result.movie.length; i++) {

                            movie = {};


                            movie.title = data.result.movie[i].title;
                            movie.movieId = data.result.movie[i].movieId;
                            movie.poster = data.result.movie[i].urlPoster;
                            movie.rating = data.result.movie[i].imdbRating;
                            movie.simplePlot = data.result.movie[i].simplePlot;
                            movie.appRating = data.result.movie[i].appRating;

                            movie.plot = data.result.movie[i].plot;
                            movie.year = data.result.movie[i].year;
                            movie.genres = data.result.movie[i].genres;
                            movie.actors = data.result.movie[i].actors;       
                            

                            movie.userComments = data.result.movie[i].userComments;                          

                            movie.show = true;
                            console.log('Movie nr:' + i + 'is;');
                            console.log(movie);

                            $scope.movies.push(movie);
                        }
                    } else {
                        movie = {};


                        movie.title = data.result.movie.title;
                        movie.movieId = data.result.movie.movieId;
                        movie.poster = data.result.movie.urlPoster;
                        movie.rating = data.result.movie.imdbRating;
                        movie.simplePlot = data.result.movie.simplePlot;
                        movie.appRating = data.result.movie.appRating;

                        movie.plot = data.result.movie.plot;
                        movie.year = data.result.movie.year;
                        movie.genres = data.result.movie.genres;
                        movie.actors = data.result.movie.actors;       
                            

                        movie.userComments = data.result.movie.userComments;

                        movie.show = true;
                        console.log('Movie is;');
                        console.log(movie);

                        $scope.movies.push(movie);
                    }
                }else{
                    movie = {};

                    movie.name = data.status._;
                    $scope.movies.push(movie);
                }
            }).
                error(function(data, status, headers, config) {
                $scope.replyMessage = "Movie not found";
                $scope.replyCode = 404;
            });

        $scope.movies = [];

    }

        //fazer um modal para cada caso
    $scope.addMovieUnseen = function(movieId){
        var url = 'http://localhost:3000/api/user/addUnseen/' + $scope.userId + '?movieId=' + movieId ;

        $scope.replyMessage = "";
        $scope.replyCode = 0;

        $http.post(url).
            success(function(data){
                console.log(data);

                if(data.status.$.code == "409"){//Movie already in one of the lists
                    //meter qqr coisa a dizer o status
                    $scope.replyCode = parseInt(data.status.$.code);
                    $scope.replyMessage = "Movie already in one of the lists";
                }else
                if(data.status.$.code == "404"){//Movie not found

                }else
                if(data.status.$.code == "200"){//Movie added to list
                    $scope.replyCode = parseInt(data.status.$.code);
                    $scope.replyMessage = "Movie added to list";
                }
            }).
            error(function(data){
                console.log('err');
            })

    }

    $scope.showMoreFunction = function(){

        if($scope.showMore == 1){
            $scope.showMore = 0;
        }
        else{
            $scope.showMore = 1;
        }

    }
});

/*
add review:

 app.controller("ReviewController", function(){

 this.review = {};

 this.addReview = function(product){
 this.review.createdOn  = Date.now();
 product.reviews.push(this.review);
 this.review = {};
 };
 });
 */
