(function(){
    'use strict';
    
    angular.module('app')
        .controller('rankingController', rankingController);
        
    rankingController.$inject = ['$http', '$routeParams'];
        
    function rankingController($http, $routeParams) {
        var self = this;
        
        self.ranking = [];
        
        activate();
        
        
        function activate(){
            self.loading = true;
            $http.get('/rm-server-web/rs/rallies/' + $routeParams.rallyId + '/ranking').then(getRankingDone, getRankingFail);
        }
        
        function getRankingDone(result) {
            self.ranking = result.data;
            self.loading = false;
        }
        
        function getRankingFail(error) {
            console.log(error);
            self.loading = false;
        }
    }
})();