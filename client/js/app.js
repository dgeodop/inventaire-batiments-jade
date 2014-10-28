'use strict';
/* App Module */

var app = angular.module("app",  [
	'ngRoute',
	'routes'
]);

app.controller("ctrlIdEtabl", function($scope,$routeParams) {
	var idEtabl = $routeParams.idEtabl;
	$scope.idEtabl = idEtabl;
});

app.controller("ctrlEtabl", function($scope, $http) {
	$http.get("api/etabl")
		.success(function(data) {
			$scope.etabls = data;
		})
});

app.controller("ctrlBatEtabl", function($scope,$http,$routeParams) {
	var idEtabl = $routeParams.idEtabl;
	$scope.idEtabl = idEtabl;
	$http.get("api/bat/" + idEtabl)
		.success(function(data) {
			$scope.bats = data;
		})
	var edit = this;
	edit.delBat = function(bat) {
		var idBat = bat.id_bat;
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/del")
			.success(function(data) {
				window.location = "#/" + idEtabl;
			})
	}
	
});

app.controller("ctrlAncienBatEtabl", function($scope,$http,$routeParams) {
	var idEtabl = $routeParams.idEtabl;
	$scope.idEtabl = idEtabl;
	$http.get("api/ancienbat/" + idEtabl)
		.success(function(data) {
			$scope.bats = data;
		})
	var edit = this;
	edit.addBat = function(bat) {
		var idBat = bat.id_bat;
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/add/ancien")
			.success(function(data) {
				window.location = "#/" + idEtabl;
			})
	}
});

app.controller("ctrlBat", function($scope, $http, $routeParams) {
	var idEtabl = $routeParams.idEtabl;
	$scope.idEtabl = idEtabl;
	var idBat = $routeParams.idBat;
	$http.get("api/bat/" + idEtabl + "/" + idBat)
		.success(function(data) {
			$scope.bat = data[0];
		})
	var edit = this;
	edit.editNom = function(bat) {
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/nom", bat)
			.success(function(data) {
				$scope.bat = data[0];
			})
	}
	edit.editSite = function(bat) {
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/site", bat)
			.success(function(data) {
				$scope.bat = data[0];
			})
	}
	edit.editAnConstr = function(bat) {
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/anconstr", bat)
			.success(function(data) {
				$scope.bat = data[0];
			})
	}
	edit.editAnRenov = function(bat) {
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/anrenov", bat)
			.success(function(data) {
				$scope.bat = data[0];
			})
	}
});

app.controller("ctrlSal", function($scope,$http,$routeParams){
	var idEtabl = $routeParams.idEtabl;
	var idBat = $routeParams.idBat;
	$scope.idEtabl = idEtabl;
	$scope.idBat = idBat;
	var app = this;
	$http.get("api/sal/" + idEtabl + "/" + idBat)
	.success(function(data) {
		$scope.sals = data;
		app.editQteSal = function(sal) {
			var idSal = sal.id_sal;
			$http.post("api/sal/" + idEtabl + "/" + idBat + "/" + idSal + "/qte", sal)
				.success(function(data) {
				$scope.sals= data;
				})
		}
		app.delSal = function(sal) {
			var idSal = sal.id_sal;
			$http.post("api/sal/" + idEtabl + "/" + idBat + "/" + idSal + "/del")
				.success(function(data) {
				$scope.sals= data;
				})
		}
	});
});

app.controller("ctrlLoc", function($scope,$http,$routeParams){
	var idEtabl = $routeParams.idEtabl;
	var idBat = $routeParams.idBat;
	$scope.idEtabl = idEtabl;
	$scope.idBat = idBat;
	$http.get("api/adr/loc")
	.success(function(data) {
		$scope.locs= data;
	})
	var app = this;
	app.choixLoc = function(lo) {
		var idLoc = app.lo.idLoc;
		window.location = "#/" + idEtabl + "/" + idBat + "/modif_adresse_bat/" + idLoc;
	}
});

app.controller("ctrlRue", function($scope,$http,$routeParams){
	var idEtabl = $routeParams.idEtabl;
	var idBat = $routeParams.idBat;
	var idLoc = $routeParams.idLoc;
	$scope.idEtabl = idEtabl;
	$scope.idBat = idBat;
	$scope.idLoc = idLoc;
	$http.get("api/adr/loc/" + idLoc)
	.success(function(data) {
		$scope.rues= data;
	})
	var app = this;
	app.choixRue = function(ru) {
		var idRue = app.ru.idRue;
		window.location = "#/" + idEtabl + "/" + idBat + "/modif_adresse_bat/" + idLoc + "/" + idRue;
	}
});

app.controller("ctrlRueNo", function($scope,$http,$routeParams){
	var idEtabl = $routeParams.idEtabl;
	var idBat = $routeParams.idBat;
	var idLoc = $routeParams.idLoc;
	var idRue = $routeParams.idRue;
	$scope.idEtabl = idEtabl;
	$scope.idBat = idBat;
	$scope.idLoc = idLoc;
	$scope.idRue = idRue;
	$http.get("api/adr/loc/" + idLoc + "/rue/" + idRue)
	.success(function(data) {
		$scope.ruenos= data;
	})
	var app = this;
	app.choixRueNo = function(no) {
		var idRueNo = app.no.idRueNo;
		window.location = "#/" + idEtabl + "/" + idBat + "/modif_adresse_bat/" + idLoc + "/" + idRue + "/" + idRueNo;
	}
});

app.controller("ctrlAdrFin", function($scope,$http,$routeParams){
	var idEtabl = $routeParams.idEtabl;
	var idBat = $routeParams.idBat;
	var idLoc = $routeParams.idLoc;
	var idRue = $routeParams.idRue;
	var idRueNo = $routeParams.idRueNo;
	var app = this;
	$http.get("api/adr/loc/" + idLoc + "/rue/" + idRue + "/no/" + idRueNo)
		.success(function(data) {
			$scope.adr = data[0];
			$scope.adr.idBat = parseInt(idBat);
			$scope.adr.idEtabl = parseInt(idEtabl);
			app.adr = $scope.adr;
		})
	app.editAdr = function(adr) {
		$http.post("api/bat/" + idEtabl + "/" + idBat + "/adr", adr)
			.success(function(data) {
				window.location = "#/" + idEtabl + "/" + idBat;
			})
	}
});

app.controller("ctrlSalNotInBat", function($scope,$http,$routeParams){
	var idEtabl = $routeParams.idEtabl;
	var idBat = $routeParams.idBat;
	$http.get("api/sal/" + idEtabl + "/" + idBat + "/notinbat")
	.success(function(data) {
		$scope.typsals= data;
	})
	var app = this;
	app.addTypSal = function(typsal) {
		$http.post("api/sal/" + idEtabl + "/" + idBat + "/new", typsal)
		.success(function(data) {
			location.reload();
		})
	}
});
