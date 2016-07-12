(function() {
'use strict';

    angular
        .module('app')
        .controller('UserDetailController', UserDetailController);

    UserDetailController.$inject = ['$http'];
    function UserDetailController($http) {
        var vm = this;

        vm.user = {};
        vm.save = save;
        

        activate();

        ////////////////

        function activate() { }

        function save(user){
            user.role = 'admin';
            $http.post('/rm-server-web/rs/config/user', user)
            .then(function(result){
                console.log("Usuario creado exitosamente");
            })
            .catch(function(err){
                console.error(err);
            });
        }
    }
})();