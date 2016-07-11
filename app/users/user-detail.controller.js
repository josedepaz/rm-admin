(function() {
'use strict';

    angular
        .module('app')
        .controller('UserDetailController', UserDetailController);

    UserDetailController.$inject = ['$http'];
    function UserDetailController($http) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();