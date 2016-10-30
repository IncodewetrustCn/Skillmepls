angular.module('app.controllers', [])

/*Login controller*/
.controller('LoginCtrl', ['$scope', '$routeParams', '$http','$location', function($scope, $routeParams, $http, $location){
 console.log('Hello from the Login Ctrl'); 
//get method
 var user = {
    username: $scope.username,
    password: $scope.password
   }

$scope.login = function(user){
    $http.post('http://skillmepls.incodewetrust.ru/api/user/generate_auth_cookie/?username=' + $scope.username + '&password=' + $scope.password + '&insecure=cool')
  .success(function(data){
    $scope.user = data.user;
    this.saveuser= function (user){
      window.localStorage.someUser = JSON.stringify(user);
    };
    this.getuser = function(){
      var data = (window.localStorage.someUser)? JSON.parse(window.localStorage.someUser).data:null,
      cookie = (window.localStorage.someUser)? JSON.parse(window.localStorage.someUser).cookie:null;
      return {
        data:data,
        cookie:cookie
      };
    };
    console.log('We Send', data.user);
    $location.path('#/Spaces/');
  })
  .error(function(data){
    console.log('Something went wrong in LoginCtrl GET METHOD', user);
  })
  };
//get method over

}])
/* Login controller*/





/*Video controller*/
.controller('VideoController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
console.log('Hello from the VideoController');

//get method
  $http.get('http://skillmepls.incodewetrust.ru/wp-json/wp/v2/posts/' + $routeParams.id)
  .success(function(data,user){
		$scope.video = data[$routeParams.id];
    $scope.video = data;
    $scope.user = data.user;
    console.log('I am getting:', data);
    console.log('I am getting:', user);
	}) 
  .error(function(data){
    console.log('Something went wrong in VideoCtrl GET METHOD');
  });
//get method over

 $scope.change_1 = function() {
    $http.get('http://skillmepls.incodewetrust.ru/wp-json/wp/v2/posts/' + $routeParams.id)
    .success(function(data){
    $scope.video = data[$routeParams.id];
     $scope.video = data;
    $scope.video_url = data.acf.video_url;
      console.log('I am getting:', data.acf.video_url);
      $scope.class1 = 'active';
    })
 }

 $scope.change_2 = function() {
    $http.get('http://skillmepls.incodewetrust.ru/wp-json/wp/v2/posts/' + $routeParams.id)
    .success(function(data){
    $scope.video = data[$routeParams.id];
     $scope.video = data;
    $scope.video_url = data.acf.video_url_2;
      console.log('I am getting:', data.acf.video_url);
      $scope.class2 = 'active';

    })
 }

 $scope.change_3 = function() {
    $http.get('http://skillmepls.incodewetrust.ru/wp-json/wp/v2/posts/' + $routeParams.id)
    .success(function(data){
    $scope.video = data[$routeParams.id];
     $scope.video = data;
    $scope.video_url = data.acf.video_url_3;
      console.log('I am getting:', data.acf.video_url);
      $scope.class3 = 'active';

    })
 }

  $http.get('http://skillmepls.incodewetrust.ru/api/get_post/?post_id=' + $routeParams.id)
  .success(function(data) {
    $scope.post = data.post;
     $scope.comments = data.post.comments;
  })

  $http.get('http://skillmepls.incodewetrust.ru/api/user/get_userinfo/?insecure=cool&user_id=1')
  .success(function(data) {
    $scope.user = data;
  })
}])

/*VIdeo controller*/








/*All spaces controller*/
.controller('SpaceController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
 console.log('Hello from the SpaceController'); 
//get method
  $http.get('http://skillmepls.incodewetrust.ru/wp-json/wp/v2/categories',{
    params: {
      per_page:100
    }
  })
  .success(function(data){
    $scope.spaces = data;
    console.log('Hello world from Space CTRL', data);
  })
  .error(function(data){
    console.log('Something went wrong in SpaceCtrl GET METHOD');
  });
//get method over

}])
/*All spaces controller*/



/*Single space controller*/
.controller('SingleSpaceController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
 console.log('Hello from the SingleSpaceController'); 
//get method
    $http.get('http://skillmepls.incodewetrust.ru/wp-json/wp/v2/posts',{
      params:{
        categories: $routeParams.id
      }
    })
  .success(function(data){
    $scope.singlePosts = data;
  })
  .error(function(data){
    console.log('Something went wrong in SingleSpaceCtrl GET METHOD');
  });
//get method over

}])
/*Single space controller*/


//filters
	.filter('limitHtml', function () {
    return function (text, limit) {
        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;
        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
})

    .filter('trustUrl', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
})


.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);
