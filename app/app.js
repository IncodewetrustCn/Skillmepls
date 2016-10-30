angular.module('app', [
	'ngRoute',
	'app.controllers',
	'app.services',

])



.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/Spaces/', {
		templateUrl: 'views/allspaces.html',
		controller: 'SpaceController',
		data: {
			authenticate:true
		}
	}).when('/login/', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	}).when('/Spaces/:id/', {
		templateUrl: 'views/singlespace.html',
		controller: 'SingleSpaceController'
	}).when('/Video/:id/', {
		templateUrl: 'views/video.html',
		controller: 'VideoController'
	}).when('/Profile/', {
		templateUrl: 'views/profile.html'
	}).otherwise({ redirectTo: '/Spaces' })
	
}]);
