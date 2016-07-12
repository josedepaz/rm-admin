(function() {
'use strict';

    angular
        .module('app')
        .controller('UserDetailController', UserDetailController);

    UserDetailController.$inject = ['$http', '$routeParams'];
    function UserDetailController($http, $routeParams) {
        var vm = this;

        vm.user = {};
        vm.save = save;
        

        activate();

        ////////////////

        function activate() {
            $http.get('/rm-server-web/rs/config/user/' + $routeParams.id)
            .then(function(result){
                vm.user = result.data;
            })
            .catch(function(err){
                console.error('Error al cargar el usuario');
            });
        }

        function save(user){
            user.role = 'admin';
            $http.put('/rm-server-web/rs/config/user/' + vm.user.id, user)
            .then(function(result){
                console.log("Usuario actualizado exitosamente");
            })
            .catch(function(err){
                console.error(err);
            });
        }
    }
})();