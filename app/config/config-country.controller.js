(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfigCountryController', ConfigCountryController);

    ConfigCountryController.$inject = ['$scope', '$http', '$mdDialog', '$mdMedia'];
    function ConfigCountryController($scope, $http, $mdDialog, $mdMedia) {
        var vm = this;
        vm.callServer = callServer;
        vm.showEditBox = showEditBox;

        activate();

        ////////////////

        function activate() { }

        function callServer(tableState) {

            vm.loading = true;

            var pagination = tableState.pagination;

            var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number || 10;  // Number of entries showed per page.

            $http.get('/rm-server-web/rs/config/country?position=' + start + '&limit=' + number)
                .then(function (result) {
                    vm.countries = result.data;
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

        function showEditBox(ev, country) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && self.customFullscreen;
            $mdDialog.show({
                controller: ConfigCountryDialogController,
                templateUrl: 'config/config-country-dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    country: country
                }
            });

            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                self.customFullscreen = (wantsFullScreen === true);
            });
        };
    }

    function ConfigCountryDialogController($scope, $mdDialog, country) {
        $scope.country = country;
    }
})();