(function(){
    'use strict';
    angular.module('app')
    .controller('MainController', MainController);
    
    function MainController(){
        var self = this;
        this.title = "Rally Matemático";
    }
})();