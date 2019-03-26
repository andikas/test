var module = angular.module('mainCtrl', ['ui.bootstrap']);
module.controller('MainController', ['$scope', 'BookService', 'IntentService', '$uibModal', function($scope, BookService, IntentService, $uibModal) {

    $scope.activeTab = 'nlp';

    $scope.selectTab = function(text){
        $scope.activeTab = text;
    }

    BookService.listBooks().then(function(res){
        $scope.books = res.data;
    });

    IntentService.listIntents().then(function(res){
        $scope.intents = res.data;
    });


    $scope.showAddNewBookModal = function(){

        $scope.modal_instance = $uibModal.open({
            templateUrl: 'addBook.html',
            controller: 'addBookController',
            scope: $scope
        });

        $scope.modal_instance.result.then(function(result) {
            $scope.books = result.data;
        });
    };

    $scope.showAddNewIntentModal = function(){

        $scope.modal_instance = $uibModal.open({
            templateUrl: 'addIntent.html',
            controller: 'addIntentController',
            scope: $scope
        });

        $scope.modal_instance.result.then(function(result) {
            $scope.intents = result.data;
        });
    };

    $scope.findSearch = function(){
        var dataSearchBook = {
            'string': $scope.searchString
        }
        BookService.searchBook(dataSearchBook).then(function(res){
            $scope.books = res.data;
        });
    };

    $scope.checkIntent = function(){
        var dataCheck = {
            'text' : $scope.textIntent
        }
        IntentService.checkIntent(dataCheck).then(function(res){
            $scope.resultIntent = res.data.intent;
        });
    };
}]);

module.controller('addBookController', ['$scope', '$state', 'BookService', '$modalInstance', function($scope, $state, BookService, $modalInstance) {
    
    $scope.submitAddBook = function(){
        var dataNewBook = {
            'title': $scope.title,
            'publisher': $scope.publisher,
            'author': $scope.author,
            'isbn': $scope.isbn,
            'synopsis': $scope.synopsis,
            'genre': $scope.genre
        }
        BookService.createBook(dataNewBook).then(function(res){
            $modalInstance.close(res);
        });
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };
    
}]);

module.controller('addIntentController', ['$scope', '$state', 'IntentService', '$modalInstance', function($scope, $state, IntentService, $modalInstance) {
    
    $scope.listNewExpresion = [''];
    $scope.pushNewToList = function(){
        $scope.listNewExpresion.push('');
        console.log('$scope.listNewExpresion', $scope.listNewExpresion);
    }
    $scope.submitAddIntent = function(){
        console.log('$scope.listNewExpresion', $scope.listNewExpresion);
        var dataNewIntent = {
            'intent': $scope.intent,
            'expression': $scope.listNewExpresion
        }
        IntentService.createIntent(dataNewIntent).then(function(res){
            $modalInstance.close(res);
        });
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };
    
}]);