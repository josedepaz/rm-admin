(function() {
'use strict';

    angular
        .module('app')
        .controller('ConfigQuestionController', ConfigQuestionController);

    ConfigQuestionController.$inject = ['$http'];
    function ConfigQuestionController($http) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();