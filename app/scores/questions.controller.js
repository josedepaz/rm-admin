(function(){
    'use strict';
    
    angular.module('app')
        .controller('QuestionsController', QuestionsController);
    
    QuestionsController.$inject = ['$http', '$routeParams'];
    
    function QuestionsController($http, $routeParams) {
        var self = this;
        
        self.rallyId = $routeParams.rallyId;
        self.contries = [];
        
        activate();
        
        function activate() {
            self.loading = true;
            $http.get('/rm-server-web/rs/rallies/' + self.rallyId + '/countries').then(getCountriesDone, getCountriesFail);
            //$http.get('scores/questions.json').then(getCountriesDone, getCountriesFail);
        }
        
        function getCountriesDone(result) {
            self.countries = result.data;
            self.loading = false;
        }
        
        function getCountriesFail(error) {
            console.log(error);
            self.loading = false;
        }
    }
})();