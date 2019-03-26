angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
	// $urlRouterProvider.otherwise("/404");
	$stateProvider.state('dashboard', {
		url: '/',
		templateUrl: 'app/views/test.html',
		controller: 'MainController'
	});
	$locationProvider.html5Mode(true);
}]).run( ['$rootScope', '$http', '$state', function($rootScope, $http, $state) {
}]);
