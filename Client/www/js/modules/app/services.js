angular.module('starter.services', [])

.factory('Api', function($http, $q, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint)

    var getApiData = function() {
        var q = $q.defer();

        $http.get(ApiEndpoint.url)
            .success(function(data) {
                console.log('Got some data from: ' + ApiEndpoint.url + '\nConnection is ok!')
                q.resolve(data);
            })
            .error(function(error){
                console.log('Connection error')
                q.reject(error);
            })

        return q.promise;
    }

    return {
        getApiData: getApiData
    };
})

.factory('Lists', function() {
  var toWatchMovies = [
    {
      name : "OI"
    }
  ];

  var watchedMovies = [
    {
      name: "fds"
    },
    {
      name: "crl"
    }
  ];

  return{
     getToWatchMovies: function() {
      return toWatchMovies;
    },
     getWatchedMovies: function() {
      return watchedMovies;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Movie', function(){

        var comments = [
            {id: 'Rafa', descrp: 'Top', content: 'Foi altamente', rating: 9, createdOn: 1397490980837},
            {id: 'Pedro', descrp: 'Meh', content: 'Ate achei porreirito', rating:6.5, createdOn: 1397490980837 },
            {id: 'Miguel', descrp: 'Fail', content: 'Um desastre', rating: 2.2, createdOn: 1397490980837}
        ];

        var movies = [
        {
            name : "OI",
            rating : 0,
            poster : "../img/clapperlogo.png",
            year: "",
            plot: "",
            show: false
        },
        {
            name : "OLA",
            rating : 0,
            poster : "../img/clapperlogo.png",
            year: "",
            plot: "",
            show: false
        }];

        return{
          getMovie: function(){
              return movie;
          },

        getComments: function(){
            return comments;
        }
        };
    });
