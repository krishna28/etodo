(function(){
	
'use strict';

angular.module("appRoutes",['ui.router','ui-notification'])

.config(function($stateProvider,$urlRouterProvider,NotificationProvider,$httpProvider){
	
	NotificationProvider.setOptions({
			delay: 10000
			, startTop: 20
			, startRight: 10
			, verticalSpacing: 20
			, horizontalSpacing: 20
			, positionX: 'left'
			, positionY: 'bottom'
		});
	$stateProvider
	        .state('home', {
				url: '/'
				, templateUrl: 'views/dashboard.html'
				, controller: 'MainCtrl'
			})
	$urlRouterProvider.otherwise('/');
})
.run(['$state', '$rootScope',function($state, $rootScope){
       
		
}]);
})();
