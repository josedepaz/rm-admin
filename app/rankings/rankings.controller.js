(function(){
    'use strict';
    
    angular.module('app')
        .controller('RankingsController', RankingsController);
        
    RankingsController.$inject = ['$http'];
        
    function RankingsController($http) {
        var self = this;
        
        self.rallies = [];
        
        activate();
        
        
        function activate(){
            self.loading = true;
            $http.get('/rm-server-web/rs/rallies').then(getRalliesDone, getRalliesFail);
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