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
    $scope.toWatchMovies = Lists.getToWatchMovies();
    $scope.watchedMovies = Lists.getWatchedMovies();
    //modificar os gets para chamadas á DB

    $scope.userId = User.getUserId();

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

        $scope.moveToSeen = function(userId, movieId, rating, comment){

        }

        $scope.removeFromUnseen = function(userId, movieId){

        }

        $scope.updateRating_Comment = function(userId, movieId){
            
        }
})

.controller('AccountCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('HomeCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
        $scope.getMovie(movie.searchText, selectedOpt.opt);
            //http://www.myapifilms.com/imdb?title=Matrix&format=XML
    }

    $scope.getMovie = function(text, option){
        var url = 'http://localhost:3000/api/movie?' + option + '=' + text;

        $http.get(url).
            success(function(data, status, headers, config) {
                console.log(data);

                if(!data.status) {
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
                            

                        movie.userComments = data.result.movies.userComments;      

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
                console.log('err');
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
