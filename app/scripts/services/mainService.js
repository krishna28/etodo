(function() {
  'use strict'

  angular.module('mainService', [])
    .factory('MainService', function($http, $q, config) {

      var mainFactory = {};

      var baseUrl = config.apiUrl;

      mainFactory.getTodos = function() {
 
        var url = baseUrl.concat("todo");
        return $http({
          method: 'GET',
          url: url
        })
        .then(function(serviceResponse) {
            return serviceResponse;
          }).catch(function(err){
            return err;
          })

      };

      mainFactory.getTodo = function(todoId){

        var url = baseUrl.concat("todo/").concat(todoId);
        console.log("url", url);
        return $http.get(url)
        .then(function(serviceResponse) {
            return serviceResponse;
          }).catch(function(err){
            return err;
          })
      }

      mainFactory.createTodo = function(description, status) {
        return $http.post(baseUrl + 'todo',{
          description: description,
          status: status
        })
          .then(function(serviceResponse) {
            return serviceResponse;
          })
      }

     mainFactory.updateTodo= function(todoId,data) {
      console.log("Id",todoId);
        return $http.put(baseUrl + 'todo/'.concat(todoId),data)
          .then(function(serviceResponse) {
            return serviceResponse;
          })

      }

      mainFactory.deleteTodo = function(todoId) {
        var url = baseUrl.concat("todo/").concat(todoId);

        return $http.delete(url, config.contentTypeConfig)
          .then(function(serviceResponse) {
            return serviceResponse;
          })

      }
      return mainFactory;

    });
})();
