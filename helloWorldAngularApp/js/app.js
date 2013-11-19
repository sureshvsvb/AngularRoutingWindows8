var checkCancel =
	{
	    data: function ($q, $route, $timeout, $window) {
	        var deferred = $q.defer();

	        if ($window.isCancelled) {
	            deferred.reject('routeCancelled');
	            $window.isCancelled = undefined;
	            return deferred.promise;
	        } else {
	            deferred.resolve();
	            $window.isCancelled = undefined;
	            return deferred.promise;
	        }
	    }
	};

angular.module('helloAngularApp', ['ngRoute'])
    .controller('vsrController', vsrController)
    .controller('vdController', vdController)
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/search', {
        templateUrl: 'vsr.html',
        controller: 'vsrController',
        resolve: checkCancel
    })
    .when('#/detail', {
        templateUrl: 'vd.html',
        controller: 'vdController'
    })
    .otherwise({
        redirectTo: '/search' //This exists in real code
    });
}], ['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['.*']);
}]);
//var module = angular.module("simpleApp", ['ngRoute', 'appControllers', 'projectControllers']).
//    config(["$routeProvider", function ($routeProvider) {
//        $routeProvider.
//            when("/home", { templateUrl: 'app/partials/home.html', controller: 'homeController' }).
//            when("/project1", { templateUrl: 'app/partials/project1.html', controller: 'project1Controller' }).
//            when("/project2", { templateUrl: 'app/partials/project2.html', controller: 'project2Controller' }).
//            otherwise({ redirectTo: "/home" });
//    }], function ($sceDelegateProvider) {
//        $sceDelegateProvider.resourceUrlWhitelist(['.*']);
//    });