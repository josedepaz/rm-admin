(function(){
    'use strict';
    
    angular.module('app')
        .controller('RankingController', RankingController);
        
    RankingController.$inject = ['$http', '$routeParams'];
        
    function RankingController($http, $routeParams) {
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