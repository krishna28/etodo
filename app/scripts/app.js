(function(){
'use strict';

/**
 * @ngdoc overview
 * @name projectManagementApplicationApp
 * @description
 * # projectManagementApplicationApp
 *
 * Main module of the application.
 */
angular.module('todo', ['appRoutes','mainService','appController','trNgGrid'])
 .constant('config',{
	       appName: 'TODO LIST',
		   apiUrl:'https://mighty-reef-89750.herokuapp.com/',
	       contentTypeConfig:{
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
       }
});
	
})();
