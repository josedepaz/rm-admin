(function(){
    'use strict';
    
    angular.module('app')
        .controller('scoresController', scoresController);
        
    scoresController.$inject = ['$http'];
        
    function scoresController($http) {
        var self = this;
        
        self.rallies = [];
        
        self.loading = true;
        
        activate();
        
        
        function activate(){
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