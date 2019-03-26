angular.module('bookService', []).factory('BookService', ['$http', function($http) {
    
    var listBooks = function(data) {
      return $http.get('/api/book');
    };

    var createBook = function(data) {
      return $http.post('/api/book/create', data);
    };

    var searchBook = function(data) {
      return $http.post('/api/book/search', data);
    };

    return {
        listBooks: listBooks,
        createBook: createBook,
        searchBook: searchBook
    };
  }]);