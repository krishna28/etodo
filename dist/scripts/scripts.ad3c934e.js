!function(){"use strict";angular.module("todo",["appRoutes","mainService","appController","trNgGrid"]).constant("config",{appName:"TODO LIST",apiUrl:"https://mighty-reef-89750.herokuapp.com/",contentTypeConfig:{headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}}})}(),function(){"use strict";angular.module("appController",[]).controller("MainCtrl",["$rootScope","Notification","MainService","$state","config",function(a,b,c,d,e){var f=this;f.newTodos=[],f.progress=[],f.completedList=[],f.newb=!0,f.todo={},f.inEdit=!1,f.getTodos=function(){c.getTodos().then(function(a){console.log("the project data is ",a);var b=a.data,c=b.filter(function(a){return"NEW"==a.status}),d=b.filter(function(a){return"INPROGRESS"==a.status}),e=b.filter(function(a){return"COMPLETED"==a.status});f.completedList=e,f.newTodos=c,f.progress=d})},f.getTodos(),f.createTodo=function(){c.createTodo(f.todo.description,f.todo.status).then(function(a){console.log(a),200==a.status&&(b.success("Project created! "),f.getTodos(),f.description="",f.status="")},function(a){console.log(a)})},f.edit=function(a){console.log("row",a);var b={};angular.copy(a,b),console.log("obj",b),f.inEdit=!0,f.todo=b},f.clear=function(){f.todo=null,f.inEdit=!1},f.updateTodo=function(){var a=f.todo;console.log("status",a);var d={description:a.description,status:a.status};console.log("dataObject",d),c.updateTodo(a.id,d).then(function(a){console.log(a),200==a.status&&(b.success("Updated"),f.getTodos(),f.clear())},function(a){console.log(a)})},f["delete"]=function(a){c.deleteTodo(a.id).then(function(a){200==a.status&&(b.success("Deleted"),f.getTodos())},function(a){console.log(a)})}}])}(),function(){"use strict";angular.module("appRoutes",["ui.router","ui-notification"]).config(["$stateProvider","$urlRouterProvider","NotificationProvider","$httpProvider",function(a,b,c,d){c.setOptions({delay:1e4,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"left",positionY:"bottom"}),a.state("home",{url:"/",templateUrl:"views/dashboard.html",controller:"MainCtrl"}),b.otherwise("/")}]).run(["$state","$rootScope",function(a,b){}])}(),function(){"use strict";angular.module("mainService",[]).factory("MainService",["$http","$q","config",function(a,b,c){var d={},e=c.apiUrl;return d.getTodos=function(){var b=e.concat("todo");return a({method:"GET",url:b}).then(function(a){return a})["catch"](function(a){return a})},d.getTodo=function(b){var c=e.concat("todo/").concat(b);return console.log("url",c),a.get(c).then(function(a){return a})["catch"](function(a){return a})},d.createTodo=function(b,c){return a.post(e+"todo",{description:b,status:c}).then(function(a){return a})},d.updateTodo=function(b,c){return console.log("Id",b),a.put(e+"todo/".concat(b),c).then(function(a){return a})},d.deleteTodo=function(b){var d=e.concat("todo/").concat(b);return a["delete"](d,c.contentTypeConfig).then(function(a){return a})},d}])}(),angular.module("projectManagementApplicationApp").run(["$templateCache",function(a){"use strict";a.put("views/dashboard.html",'<div ng-controller="MainCtrl as mainVm"> <div class="row" id="projecdt" style="background-color: white;padding: 10px"> <div class="col-md-6"> <h3 style="display: inline-block">To do</h3> <hr> <div> <form role="form" name="form1"> <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12"> <label for="title">Description</label> <input type="text" class="form-control" name="description" class="form-control" id="description" placeholder="Description" ng-model="mainVm.todo.description"> </div> <div class="form-group col-xs-12"> <label for="status">Status</label> <select class="form-control" id="status" ng-model="mainVm.todo.status" name="status"> <option value="">Select Status</option> <option value="NEW">NEW</option> <option value="INPROGRESS">IN-PROGRESS</option> <option value="COMPLETED">COMPLETED</option> </select> </div> <div class="col-xs-12"> <button ng-if="!mainVm.inEdit" type="button" class="btn btn-success" ng-click="mainVm.createTodo()">Create</button> <button ng-if="mainVm.inEdit" type="button" class="btn btn-success" ng-click="mainVm.updateTodo()">Update</button> <button class="btn btn-primary" type="button" ng-click="mainVm.clear()" type="button">Cancel</button> </div> </form> </div> </div> <div class="col-sm-6"> <label class="checkbox-inline"><input type="checkbox" ng-model="mainVm.newb">View New</label> <label class="checkbox-inline"><input type="checkbox" ng-model="mainVm.pendingb">View Pending</label> <label class="checkbox-inline"><input type="checkbox" ng-model="mainVm.complatedb">View Completed</label> <div class="form-group col-xs-12" ng-if="mainVm.newTodos.length > 0 && mainVm.newb"> <h3>New List</h3> <table class="table table-bordered table-dark"> <thead> <tr> <th scope="col">Description</th> <th scope="col">Status</th> <th scope="col">Action</th> </tr> </thead> <tbody> <tr ng-repeat="row in mainVm.newTodos" ng-class="\'alert alert-danger\'"> <td style="text-align: left">{{row.description}}</td> <td style="text-align: left">{{row.status}}</td> <td> <button type="button" class="btn btn-primary btn-xs" data-ng-click="mainVm.edit(row)">Edit</button> <button type="button" class="btn btn-danger btn-xs" data-ng-click="mainVm.delete(row)">Delete</button> </td> </tr> </tbody> </table> </div> <hr> <div class="form-group col-xs-12" ng-if="mainVm.progress.length > 0 && mainVm.pendingb"> <h3>In Progress</h3> <table class="table table-bordered table-dark"> <thead> <tr> <th scope="col">Description</th> <th scope="col">Status</th> <th scope="col">Action</th> </tr> </thead> <tbody> <tr ng-repeat="row in mainVm.progress" ng-class="\'alert alert-info\'"> <td style="text-align: left">{{row.description}}</td> <td style="text-align: left">{{row.status}}</td> <td> <button type="button" class="btn btn-primary btn-xs" data-ng-click="mainVm.edit(row)">Edit</button> <button type="button" class="btn btn-danger btn-xs" data-ng-click="mainVm.delete(row)">Delete</button> </td> </tr> </tbody> </table> </div> <hr> <div class="form-group col-xs-12" ng-if="mainVm.completedList.length > 0 && mainVm.complatedb"> <h3>Completed</h3> <table class="table table-bordered table-dark"> <thead> <tr> <th scope="col">Description</th> <th scope="col">Status</th> <th scope="col">Action</th> </tr> </thead> <tbody> <tr ng-repeat="row in mainVm.completedList" ng-class="\'alert alert-success\'"> <td style="text-align: left">{{row.description}}</td> <td style="text-align: left">{{row.status}}</td> <td> <button type="button" class="btn btn-primary btn-xs" data-ng-click="mainVm.edit(row)">Edit</button> <button type="button" class="btn btn-danger btn-xs" data-ng-click="mainVm.delete(row)">Delete</button> </td> </tr> </tbody> </table> </div> </div> </div> <hr> </div>'),a.put("views/main.html",'<!-- <div class="jumbotron">\r\n  <h1>TODO Application</h1>\r\n</div>\r\n -->')}]);