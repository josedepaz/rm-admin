(function(){
    'use strict';
    
    angular.module('app')
        .controller('ScoresController', ScoresController);
        
    ScoresController.$inject = ['$http'];
        
    function ScoresController($http) {
        var self = this;
        
        self.rallies = [];
        
        activate();
        
        
        function activate(){
            self.loading = true;
            $http.get('/rm-server-web/rs/rallies').then(getRalliesDone, getRalliesFail);
            //$http.get('/scores/rallies.json').then(getRalliesDone, getRalliesFail);
        }
        
        function getRalliesDone(result) {
            self.rallies = result.data;
            self.loading = false;
        }
        
        function getRalliesFail(error) {
            console.log(error);
            self.loading = false;
        }
    }
})();