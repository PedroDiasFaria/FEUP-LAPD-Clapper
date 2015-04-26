angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Api) {
    $scope.data = null;
    Api.getApiData()
        .then(function(result) {
            $scope.data = result.data;
        })
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

    //TODO passar para modulo movies
.controller('SearchMoviesCtrl', function($scope, $http, Movie) {

        $scope.searchOpts = [
            {opt: 'title', optName: 'Movie Title'},
            {opt: 'idIMDB', optName: 'Movie ID'},
            {opt: 'name', optName: 'Actor Name'}
        ];

        $scope.selectedOpt = $scope.searchOpts[0];
        $scope.movieXML = Movie.getMovie();
        $scope.comments = "";
        $scope.comments = Movie.getComments();

        $scope.searchMovieBy = function(movie, selectedOpt){
            console.log('Searching ' + movie.searchText + ' and ' + selectedOpt.opt);

            $scope.getMovie(movie.searchText, selectedOpt.opt);
            //http://www.myapifilms.com/imdb?title=Matrix&format=XML

        }

        $scope.getMovie = function(text, option){
            var url = 'http://www.myapifilms.com/imdb?' + option + '=' + text + '&format=XML';

            console.log('Request to: ' + url);

            $http.get(url).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(data);
                    if(window.DOMParser){
                        parser = new DOMParser()
                        xmlDoc=parser.parseFromString(data,"text/xml");
                    }

                        $scope.movieXML.name = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        $scope.movieXML.poster = xmlDoc.getElementsByTagName("urlPoster")[0].childNodes[0].nodeValue;
                        $scope.movieXML.rating = xmlDoc.getElementsByTagName("rating")[0].childNodes[0].nodeValue;
                        $scope.movieXML.plot = xmlDoc.getElementsByTagName("plot")[0].childNodes[0].nodeValue;
                        $scope.movieXML.show = true;
                        $scope.comments = Movie.getComments();

                    console.log($scope.comments);

                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('err');
                });

        }
    })
;

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
