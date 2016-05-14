(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngSanitize', 'ngAnimate', 'smart-table'])
        .config(configuration)
        .directive("repeatEnd", repeatEnd);

    configuration.$inject = ['$routeProvider'];

    function configuration($routeProvider) {
	       $routeProvider
            .when('/config/', {
                templateUrl: 'config/config-rally.html',
                controller: 'ConfigRallyController',
                controllerAs: 'configRallyCtrl'   
            })
            .when('/scores/', {
                templateUrl: 'scores/scores.html',
                controller: 'scoresController',
                controllerAs: 'scoresCtrl'
            })
            .when('/scores/rally/:rallyId/questions/', {
                templateUrl: 'scores/questions.html',
                controller: 'questionsController',
                controllerAs: 'questionsCtrl'
            })
            .when('/scores/rally/:rallyId/questions/:questionId/answers', {
                templateUrl: 'scores/answers.html',
                controller: 'answersController',
                controllerAs: 'answersCtrl'
            })
            .when('/rankings/', {
                templateUrl: 'rankings/rankings.html',
                controller: 'rankingsController',
                controllerAs: 'rankingsCtrl'
            })
            .when('/rankings/:rallyId', {
                templateUrl: 'rankings/ranking.html',
                controller: 'rankingController',
                controllerAs: 'rankingCtrl'
            })
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl'
            })
            .otherwise({
                templateUrl: 'home/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl'
            });
    }

    repeatEnd.$inject = ['$timeout'];

    function repeatEnd($timeout) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (scope.$last) {
                    $timeout(function () {
                        componentHandler.upgradeAllRegistered();
                    });
                }
            }
        };
    }
})();