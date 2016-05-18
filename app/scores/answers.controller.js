(function () {
    'use strict';

    angular.module('app')
        .controller('answersController', answersController);

    answersController.$inject = ['$http', '$routeParams', '$timeout'];

    function answersController($http, $routeParams, $timeout) {
        var self = this;

        self.questionInfo = {};
        self.answers = [];
        self.points = [0,1,2,3,4,5,6,7,8,9,10];

        self.savePoints = savePoints;

        activate();

        function savePoints(answerId, answer) {
            self.loading = true;
            $http.post('/rm-server-web/rs/rallies/questions/' + $routeParams.questionId + '/answers/' + answerId, answer)
                .then(savePointsDone, savePointsFail);
        }

        function savePointsDone(result) {
            console.log(result);
            self.loading = false;
            toastr.info("Puntos guardados exitosamente");
        }

        function savePointsFail(error) {
            toastr.error(error);
            self.loading = false;
        }

        function activate() {
            self.loading = true;
            $http.get('/rm-server-web/rs/rallies/questions/' + $routeParams.questionId)
                .then(getQuestionDone, getQuestionFail);

            //$http.get('scores/question.json')
            //    .then(getQuestionDone, getQuestionFail);

            $http.get('/rm-server-web/rs/rallies/questions/' + $routeParams.questionId + '/answers')
                .then(getAnswersDone, getAnswersFail);

            //$http.get('scores/answers.json')
            //    .then(getAnswersDone, getAnswersFail);
        }

        function getQuestionDone(result) {
            console.log(result.data);
            self.questionInfo = result.data;
        }

        function getQuestionFail(error) {
            console.log(error);
        }

        function getAnswersDone(result) {
            self.loading = false;
            self.answers = result.data;
        }

        function getAnswersFail(error) {
            self.loading = false;
            console.log(error);
        }
    }
})();