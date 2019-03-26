angular.module('intentService', []).factory('IntentService', ['$http', function($http) {
    
    var listIntents = function(data) {
      return $http.get('/api/intent');
    };

    var createIntent = function(data) {
      return $http.post('/api/intent/create', data);
    };

    var checkIntent = function(data) {
      return $http.post('/api/intent/check', data);
    };


    return {
        listIntents: listIntents,
        createIntent: createIntent,
        checkIntent: checkIntent
    };
  }]);