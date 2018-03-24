(function(){
	
'use strict'

angular.module('appController', [])
	.controller('MainCtrl', function ($rootScope, Notification,MainService, $state, config) {

		var mainVm = this;

		mainVm.newTodos = []
		mainVm.progress = []
		mainVm.completedList = []
		mainVm.newb = true

		mainVm.todo = {};
        mainVm.inEdit = false
		
		mainVm.getTodos = function () {

			MainService.getTodos().then(function (response) {
				console.log("the project data is ", response);
                 var todos = response.data;

                 //filter level

                                  		
                 	var newlist = todos.filter(function(ex){
                 			return ex.status == "NEW"
                 	})
                 	var inprogresslist = todos.filter(function(ex){
                 			return ex.status == "INPROGRESS"
                 	})
                 	var completedList = todos.filter(function(ex){

                 		return ex.status == "COMPLETED"
                 	})
                 	mainVm.completedList = completedList
		            mainVm.newTodos = newlist
		            mainVm.progress = inprogresslist

			})
		};
		mainVm.getTodos();



		mainVm.createTodo = function () {
			MainService.createTodo(mainVm.todo.description, mainVm.todo.status).then(function successHandler(serviceResponse) {
				console.log(serviceResponse);
				if (serviceResponse.status == 200) {
					Notification.success('Project created! ');
					mainVm.getTodos();
					mainVm.description = "";
					mainVm.status = "";
				}
			}, function errorHnadler(err) {
				console.log(err);
			})
		}

		mainVm.edit = function(row){ 
              console.log("row", row);
              var ob = {}
              angular.copy(row,ob);
              console.log("obj",ob)
              mainVm.inEdit = true;
              mainVm.todo = ob;
		}

		mainVm.clear = function(){
			mainVm.todo = null;
			mainVm.inEdit = false
		}
		//
		mainVm.updateTodo = function () {

          var data = mainVm.todo
          console.log("status",data);
          var dataObject = {
          	description: data.description,
          	status: data.status
          }
          console.log("dataObject", dataObject);
          // return false;
          
          MainService.updateTodo(data.id,dataObject).then(function successHandler(serviceResponse) {
				console.log(serviceResponse);
				if (serviceResponse.status == 200) {
                   Notification.success("Updated");
                   mainVm.getTodos();
                   mainVm.clear();
               }
			}, function errorHnadler(err) {
				console.log(err);
			})

		};

		mainVm.delete = function(todo){
			MainService.deleteTodo(todo.id).then(function successHandler(serviceResponse){
				if(serviceResponse.status == 200){
					 Notification.success("Deleted");
					 mainVm.getTodos();
				}
             
			},function errorHnadler(err){
				console.log(err);
			})
		}

	})
})();	