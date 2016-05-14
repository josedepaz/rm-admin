(function () {
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
        vm.callServer = callServer;


        activate();

        ////////////////

        function activate() {
            //updateRallies();
        }

        function updateRallies(s) {
            $http.get('/rm-server-web/rs/config/rally')
                .then(function (result) {
                    vm.rallies = result.data;
                })
                .catch(function (error) {

                });
        }

        function createRally(newRally) {
            $http.post('/rm-server-web/rs/config/rally', newRally)
                .then(function (result) {
                    toast.succes("Rally crearo exitosamente");
                })
                .catch(function (error) {
                    console.error(error);
                });
        }

        function callServer(tableState) {

            vm.isLoading = true;

            var pagination = tableState.pagination;

            var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number || 10;  // Number of entries showed per page.

            $http.get('/rm-server-web/rs/config/rally?position=' + start + '&limit=' + number)
                .then(function (result) {
                    vm.rallies = result.data;
                    vm.isLoading = false;
                })
                .catch(function (error) {
                    vm.isLoading = false;
                });
            
            /*service.getPage(start, number, tableState).then(function (result) {
                vm.displayed = result.data;
                tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
                vm.isLoading = false;
            });*/
        };
    }
})();