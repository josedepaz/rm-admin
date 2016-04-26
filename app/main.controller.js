(function(){
    'use strict';
    angular.module('app')
    .controller('mainController', mainController);
    
    function mainController(){
        var self = this;
        this.title = "Rally Matemático";
    }
})();