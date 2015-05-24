angular.module('starter.controllers', [])



.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ListsCtrl', function($scope, $http, $ionicModal, Lists) {
    $scope.toWatchMovies = Lists.getToWatchMovies();
    $scope.watchedMovies = Lists.getWatchedMovies();


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
})

.controller('AccountCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('HomeCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

    //TODO passar para modulo movies
.controller('SearchMoviesCtrl', function($scope, $http, Movie) {

    $scope.searchOpts = [
        {opt: 'name', optName: 'Movie Title'},
        {opt: 'id', optName: 'Movie ID'}
    ];

    $scope.selectedOpt = $scope.searchOpts[0];

    $scope.movies = [];
    $scope.comments = "";
    $scope.comments = Movie.getComments();

    //$scope.movieXML = Movie.getMovie();


    $scope.searchMovieBy = function(movie, selectedOpt){
        console.log('Searching ' + movie.searchText + ' and ' + selectedOpt.opt);

        $scope.getMovie(movie.searchText, selectedOpt.opt);
            //http://www.myapifilms.com/imdb?title=Matrix&format=XML
    }

    $scope.getMovie = function(text, option){
        /*var url = 'http://www.myapifilms.com/imdb?' + option + '=' + text + '&format=XML';

        console.log('Request to: ' + url);*/

        var url = 'http://localhost:3000/api/movie?' + option + '=' + text;

        $http.get(url).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data);
                /*if(window.DOMParser){
                parser = new DOMParser()
                // xmlDoc=parser.parseFromString(data,"text/xml");
                }*/
                console.log(data);

                if(!data.status) {
                    if (data.result.movie.length > 1) {
                        for (var i = 0; i < data.result.movie.length; i++) {

                            movie = {};


                            movie.name = data.result.movie[i].title;
                            movie.poster = data.result.movie[i].urlPoster;
                            movie.rating = data.result.movie[i].imdbRating;
                            movie.plot = data.result.movie[i].simplePlot;
                            movie.appRating = data.result.movie[i].appRating;
                            movie.show = true;

                            console.log('Movie nr:' + i + 'is;');
                            console.log(movie);

                            $scope.movies.push(movie);


                            //console.log($scope.comments);
                        }
                    } else {
                        movie = {};


                        movie.name = data.result.movie.title;
                        movie.poster = data.result.movie.urlPoster;
                        movie.rating = data.result.movie.imdbRating;
                        movie.plot = data.result.movie.simplePlot;
                        movie.appRating = data.result.movie.appRating;
                        movie.show = true;

                        console.log('Movie is;');
                        console.log(movie);

                        $scope.movies.push(movie);
                    }
                }else{
                    movie = {};


                    movie.name = data.status;
                    $scope.movies.push(movie);
                }
            }).
             error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('err');
            });

        $scope.movies = [];

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
