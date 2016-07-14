(function() {
'use strict';

    angular
        .module('app')
        .controller('ConfigQuestionsController', ConfigQuestionsController);

    ConfigQuestionsController.$inject = ['$http'];
    function ConfigQuestionsController($http) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();