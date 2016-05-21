(function() {
'use strict';

    angular
        .module('app')
        .controller('ConfigCountryController', ConfigCountryController);

    ConfigCountryController.$inject = ['$http'];
    function ConfigCountryController($http) {
        var vm = this;
        vm.callServer = callServer;

        activate();

        ////////////////

        function activate() { }
        
        function callServer(tableState) {

            vm.isLoading = true;

            var pagination = tableState.pagination;

            var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number || 10;  // Number of entries showed per page.

            $http.get('/rm-server-web/rs/config/country?position=' + start + '&limit=' + number)
                .then(function (result) {
                    vm.countries = result.data;
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