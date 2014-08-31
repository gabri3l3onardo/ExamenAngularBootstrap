var appExamen = angular.module('appExamen',['ngRoute']);

appExamen.controller('contrNuevo',function($scope, $http){
	$scope.nuevo = {
		'background_image': 'http://www.todocajas.com.ar/cajas-para-archivo/caja-archivo-con-tapa.jpg',
		'profile_image': 'http://www.todocajas.com.ar/cajas-para-archivo/caja-archivo-con-tapa.jpg',
		'genre': '01',
		'name': 'examen'
	};
	
	$scope.agregar = function(){
		$http({
			method: 'POST',
			url: 'http://54.200.77.121/artist',
			data: $scope.nuevo,
			headers: {'Content-Type': 'application/x-www-form-urlencoded, charset=utf-8'}
		}).success(function(response){
			//Exito
			console.log(response.response);
			console.log("Insercion Exitosa");
		}).error(function(response){
			//Error
			console.log(response);
			console.log("Error en la insercion");
		});
	};
	
	$("#idImgFondo").change(function(){
		$scope.nuevo.background_image = $(this).val().split('\\').pop();
	});
	
	$("#idImgPerfil").change(function(){
		$scope.nuevo.profile_image = $(this).val().split('\\').pop();
	});
});
	
appExamen.controller('contrConsulta',function($scope, $http){
	$scope.artistas = null;
	
	
	$http({
		method: 'GET',
		url: 'http://54.200.77.121/artist',
	}).success(function(data,status){
		//Exito
		$scope.artistas = data;
		console.log("Consulta Exitosa");
	}).error(function(data,status){
		//Error
		console.log("Error en la consulta");
	});
	
	
	
});
			
appExamen.config(function($routeProvider){
					$routeProvider.when('/consulta',
					{
						controller: "contrConsulta",
						templateUrl: "paginas/View1.html"
					}).when('/nuevo',
					{
						controller: "contrNuevo",
						templateUrl: "paginas/View2.html"
					}).otherwise({ redirectTo: '/consulta'});
});