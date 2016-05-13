(function() {
'use strict';

    angular
        .module('app')
        .controller('ConfigRallyController', ConfigRallyController);

    ConfigRallyController.$inject = ['$http'];
    function ConfigRallyController($http) {
        var vm = this;
        
        vm.rallies = [];
        vm.newRally = {};
        vm.createRally = createRally;
        

        activate();

        ////////////////

        function activate() {
            updateRallies();
        }
        
        function updateRallies(s) {
            $http.get('/rm-server-web/rs/config/rally')
            .then(function(result){
                vm.rallies = result.data;
            })
            .catch(function(error){
                
            });
        }
        
        function createRally(newRally) {
            $http.post('/rm-server-web/rs/config/rally', newRally)
            .then(function(result){
                toast.succes("Rally crearo exitosamente");
            })
            .catch(function(error){
                console.error(error);
            });
        }
    }
})();