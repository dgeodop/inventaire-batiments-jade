var routes = angular.module('routes', []);

routes.config(['$routeProvider',
 function($routeProvider) {
 $routeProvider
 	.when('/', {templateUrl: 'partials/etabl.html'})
 	.when('/:idEtabl', {templateUrl: 'partials/bat-of-etabl.html'})
 	.when('/:idEtabl/:idBat', {templateUrl: 'partials/bat.html'})
 	.when('/:idEtabl/:idBat/modif_nom_bat', {templateUrl: 'partials/modif_nom_bat.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat', {templateUrl: 'partials/modif_adresse_bat.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat/:idLoc', {templateUrl: 'partials/modif_adresse_bat_rue.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat/:idLoc/:idRue', {templateUrl: 'partials/modif_adresse_bat_rueno.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat/:idLoc/:idRue/:idRueNo', {templateUrl: 'partials/modif_adresse_bat_fin.html'})
 	.when('/:idEtabl/:idBat/modif_salles_bat', {templateUrl: 'partials/modif_salles_bat.html'})
 	.when('/:idEtabl/:idBat/modif_annees_bat', {templateUrl: 'partials/modif_annees_bat.html'})
 	.otherwise({redirectTo: '/'});
 }]);