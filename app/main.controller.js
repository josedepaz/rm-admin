function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

(function(){
    'use strict';
    angular.module('app')
    .controller('MainController', MainController);

    function MainController(){
        var self = this;
        this.title = "Rally Matemático";
        if(!getCookie("atAdmin")){
            window.location.href = "/rm-admin/login.html";
        }
    }
})();