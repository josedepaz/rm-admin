(function(){
    'use strict';
    
    angular.module('app')
        .controller('HomeController', HomeController);
        
    HomeController.$inject = ['$http'];
        
    function HomeController($http) {
        var vm = this;
        
        vm.rallies = [];
        
        activate();
        
        
        function activate(){
            $http.get('/rm-server-web/rs/rallies').then(getRalliesDone, getRalliesFail);
        }
        
        function getRalliesDone(result) {
            vm.rallies = result.data;
        }
        
        function getRalliesFail(error) {
            console.log(error);
        }
    }
})();