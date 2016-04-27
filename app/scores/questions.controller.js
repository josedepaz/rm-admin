(function(){
    'use strict';
    
    angular.module('app')
        .controller('questionsController', questionsController);
    
    questionsController.$inject = ['$http', '$routeParams'];
    
    function questionsController($http, $routeParams) {
        var self = this;
        
        self.rallyId = $routeParams.rallyId;
        self.contries = [];
        
        activate();
        
        function activate() {
            $http.get('/rm-server-web/rs/rallies/' + self.rallyId + '/countries').then(getCountriesDone, getCountriesFail);
            //$http.get('scores/questions.json').then(getCountriesDone, getCountriesFail);
        }
        
        function getCountriesDone(result) {
            self.countries = result.data;
        }
        
        function getCountriesFail(error) {
            console.log(error);
        }
    }
})();