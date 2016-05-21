(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfigRallyController', ConfigRallyController);

    ConfigRallyController.$inject = ['$scope', '$http', '$mdDialog', '$mdMedia'];
    function ConfigRallyController($scope, $http, $mdDialog, $mdMedia) {
        var vm = this;

        vm.rallies = [];
        vm.newRally = {};
        vm.createRally = createRally;
        vm.callServer = callServer;
        vm.showEditBox = showEditBox;


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

        function showEditBox(ev, rally) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && self.customFullscreen;
            $mdDialog.show({
                controller: ConfigRallyDialogController,
                templateUrl: 'config/config-rally-dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    rally: rally
                }
            });

            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                self.customFullscreen = (wantsFullScreen === true);
            });
        };
    }

    //DialogController
    function ConfigRallyDialogController($scope, $mdDialog, rally) {
        $scope.rally = rally;
        $scope.rally.startDate = new Date($scope.rally.startDate);

        $scope.close = close;
        $scope.save = save;

        $scope.transformChip = transformChip;
        $scope.querySearch = querySearch;

        $scope.countries = loadCountries();

        function close() {
            $mdDialog.hide();
        }

        function save() {
            $mdDialog.hide();
        }

        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        }

        function querySearch(query) {
            var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                    (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
            };
        }

        function loadCountries() {
            
            var countries = [];
            angular.forEach($scope.rally.rallyCountries, function(value, key){
                countries.push(value);
            });
            return countries;
            /*return countries.map(function (veg) {
                veg._lowername = veg.name.toLowerCase();
                veg._lowertype = veg.type.toLowerCase();
                return veg;
            });*/
        }
    }
})();