(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngSanitize', 'ngAnimate', 'smart-table', 'ngMaterial'])
        .config(configuration)
        .directive("repeatEnd", repeatEnd);

    configuration.$inject = ['$routeProvider', '$mdThemingProvider'];

    function configuration($routeProvider, $mdThemingProvider) {
	       $routeProvider
            .when('/config/', {
                templateUrl: 'config/config-rally.html',
                controller: 'ConfigRallyController',
                controllerAs: 'configRallyCtrl'
            })
            .when('/config/countries', {
                templateUrl: 'config/config-country.html',
                controller: 'ConfigCountryController',
                controllerAs: 'configCountryCtrl'
            })
            .when('/scores/', {
                templateUrl: 'scores/scores.html',
                controller: 'ScoresController',
                controllerAs: 'scoresCtrl'
            })
            .when('/scores/rally/:rallyId/questions/', {
                templateUrl: 'scores/questions.html',
                controller: 'QuestionsController',
                controllerAs: 'questionsCtrl'
            })
            .when('/scores/rally/:rallyId/questions/:questionId/answers', {
                templateUrl: 'scores/answers.html',
                controller: 'AnswersController',
                controllerAs: 'answersCtrl'
            })
            .when('/rankings/', {
                templateUrl: 'rankings/rankings.html',
                controller: 'RankingsController',
                controllerAs: 'rankingsCtrl'
            })
            .when('/rankings/:rallyId', {
                templateUrl: 'rankings/ranking.html',
                controller: 'RankingController',
                controllerAs: 'rankingCtrl'
            })
            .when('/users/', {
                templateUrl: 'users/users.html',
                controller: 'UsersController',
                controllerAs: 'usersController'
            })
            .when('/users/new', {
                templateUrl: 'users/user-detail.html',
                controller: 'UserDetailController',
                controllerAs: 'userDetailController'
            })
            .when('/users/{id}', {
                templateUrl: 'users/user-new.html',
                controller: 'UserNewController',
                controllerAs: 'userNewController'
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

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
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