(function() {
'use strict';

    angular
        .module('app')
        .controller('ConfigCountryController', ConfigCountryController);

    ConfigCountryController.$inject = ['$http'];
    function ConfigCountryController($http) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();