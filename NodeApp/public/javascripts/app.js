var app = angular.module('angularjsNodejs', []);

app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    var request = $http({
      url: '/login',
      method: 'POST',
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === 'success') {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = 'http://localhost:8081/dashboard'
      }
    });
    request.error(function(err) {
      // failed
      console.log('ERROR: ', err);
    });
  };
});

app.controller('usersController', function($scope, $http) {
  $http({
    url: '/users',
    method: 'GET'
  }).then(res => {
    console.log('Users: ', res.data);
    $scope.users = res.data;
  }, err => {
    console.log('Users ERROR: ', err);
  });
});

app.controller('genresController', function($scope, $http) {
  $http({
    url: '/genres',
    method: 'GET'
  }).then(res => {
    console.log('Genres: ', res.data);
    $scope.genres = res.data;
  }, err => {
    console.log('Genres ERROR: ', err);
  });
});

app.controller('submitGenreController', function($scope, $http) {
  $scope.submitGenre = function(genre) {
    $http({
      url: '/genres/' + genre,
      method: 'GET'
    }).then(res => {
      console.log('Best in Genre: ', res.data);
      $scope.bestInGenre = res.data;
    }, err => {
      console.log('Best in Genre: ', err);
    });
  }
});

app.controller('recommendationsController', function($scope, $http) {
  $scope.submitMovieIDs = function() {
    $http({
      url: '/recommendations/' + $scope.movieID1 + '/' + $scope.movieID2 + '/' + $scope.movieID3,
      method: 'GET'
    }).then(res => {
      console.log('Recommendations: ', res.data);
      $scope.recommendations = res.data;
    }, err => {
      console.log('Recommendations ERROR: ', err);
    });
  }
});

app.controller('decadesController', function($scope, $http) {
  $http({
    url: '/decades',
    method: 'GET'
  }).then(res => {
    console.log('Decades: ', res.data);
    $scope.decades = res.data;
  }, err => {
    console.log('Decades ERROR: ', err);
  });
});

app.controller('submitDecadeController', function($scope, $http) {
  $scope.submitDecade = function() {
    console.log($scope.selectedDecade.decade);
    $http({
      url: '/bestOf/' + $scope.selectedDecade.decade,
      method: 'GET'
    }).then(res => {
      console.log('Best in Decade: ', res.data);
      $scope.bestInDecade = res.data;
    }, err => {
      console.log('Best in Decade: ', err);
    });
  };
});

app.controller('postersController', function($scope, $http) {
  $http({
    url: '/randomMovies',
    method: 'GET'
  }).then(res => {
    console.log('Random Movies: ', res.data);

    var links = [{}];

    res.data.forEach(element => {
      var temp = new Object();
      
      $http({
        url: 'http://www.omdbapi.com/?apikey=792ab44c&i=' + element.imdb_id,
        method: 'GET'
      }).then(res => {
        console.log('Poster: ', res.data.Poster);
        temp['posterLink'] = res.data.Poster;

        console.log('Website: ', res.data.Website);
        if (res.data.Website == 'N/A')
          temp['websiteLink'] = false;
        else
          temp['websiteLink'] = res.data.Website;
      }, err => {
        console.log('No data available');
        temp['posterLink'] = false;
        temp['websiteLink'] = false;
      });

      console.log(temp['posterLink']);
      console.log(temp['websiteLink']);
      links.push(temp);
    });
    links.splice(0, 1);
    console.log(links);

    $scope.randomMovies = res.data;
    $scope.links = links;
  }, err => {
    console.log('Random Movies ERROR: ', err);
  });
});

// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {
    
  };
});
*/