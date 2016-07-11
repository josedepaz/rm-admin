(function () {
    'use strict';

    angular
        .module('app')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$scope', '$http'];

    function UsersController($scope, $http) {
        var vm = this;
        vm.callServer = callServer;

        activate();

        ////////////////

        function activate() { }

        function callServer(tableState) {

            vm.loading = true;

            var pagination = tableState.pagination;

            var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number || 10;  // Number of entries showed per page.

            $http.get('/rm-server-web/rs/admin/users/admin')
                .then(function (result) {
                    vm.users = result.data;
                    vm.loading = false;
                })
                .catch(function (error) {
                    vm.loading = false;
                });

            /*service.getPage(start, number, tableState).then(function (result) {
                vm.displayed = result.data;
                tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
                vm.isLoading = false;
            });*/
        };
    }
})();