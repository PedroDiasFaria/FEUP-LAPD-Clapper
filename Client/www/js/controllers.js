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

.controller('SearchMovies', function($scope, $http) {

        $scope.searchOpts = [
            {opt: 'Title'},
            {opt: 'ID'},
            {opt: 'Actors'}
        ];

        $scope.selectedOpt = $scope.searchOpts[0];

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
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('err');
                });

        }
    })

;
