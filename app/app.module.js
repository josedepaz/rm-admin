(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngSanitize'])
        .config(configuration)
        .directive("repeatEnd", repeatEnd);

    configuration.$inject = ['$routeProvider'];

    function configuration($routeProvider) {
	       $routeProvider
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
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .otherwise({
                templateUrl: 'home/home.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            });
    }

    function repeatEnd() {
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