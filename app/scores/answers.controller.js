(function(){
    'use strict';
    
    angular.module('app')
        .controller('answersController', answersController);
    
    answersController.$inject = ['$http', '$routeParams'];
    
    function answersController($http, $routeParams){
        var self = this;
        
        self.questionInfo = {};
        self.answers = [];
        
        self.savePoints = savePoints;
        
        activate();
        
        function savePoints(answerId, answer){
            $http.post('/rm-server-web/rs/rallies/questions/' + $routeParams.questionId + '/answers/' + answerId, answer)
            .then(savePointsDone, savePointsFail);
        }
        
        function savePointsDone(result){
            console.log(result);
            alert("Puntos guardados exitosamente");
        }
        
        function savePointsFail(error){
            console.error(error);
        }
        
        function activate(){
            $http.get('/rm-server-web/rs/rallies/questions/' + $routeParams.questionId)
                .then(getQuestionDone, getQuestionFail);
            
            $http.get('/rm-server-web/rs/rallies/questions/' + $routeParams.questionId + '/answers')
                .then(getAnswersDone, getAnswersFail);
        }
        
        function getQuestionDone(result) {
            console.log(result.data);
            self.questionInfo = result.data;
        }
        
        function getQuestionFail(error){
            console.log(error);
        }
        
        function getAnswersDone(result) {
            self.answers = result.data;
        }
        
        function getAnswersFail(error) {
            console.log(error);
        }
    }
})();