(function() {
'use strict';

    angular
        .module('app')
        .controller('ConfigQuestionsController', ConfigQuestionsController);

    ConfigQuestionsController.$inject = ['$http'];
    function ConfigQuestionsController($http) {
        var vm = this;
        
        vm.questions = [];

        activate();

        ////////////////

        function activate() {
            $http.get('/rm-server-web/rs/config/question')
            .then(function(result){
                vm.questions = result.data.filter(function(item){
                    item.type === 'question';
                });
            })
            .catch(function(err){
                console.error(err);
            });
        }
    }
})();