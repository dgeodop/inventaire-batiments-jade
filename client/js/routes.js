var routes = angular.module('routes', []);

routes.config(['$routeProvider',
 function($routeProvider) {
 $routeProvider
 	.when('/', {templateUrl: 'partials/etabl.html'})
 	.when('/:idEtabl', {templateUrl: 'partials/bat-of-etabl.html'})
 	.when('/:idEtabl/suppr_bat', {templateUrl: 'partials/suppr_bat.html'})
 	.when('/:idEtabl/ajout_bat', {templateUrl: 'partials/ajout_bat.html'})
 	.when('/:idEtabl/ajout_bat/ancien', {templateUrl: 'partials/ajout_bat_ancien.html'})
 	.when('/:idEtabl/ajout_bat/autre_etabl', {templateUrl: 'partials/ajout_bat_autre_etabl.html'})
 	.when('/:idEtabl/ajout_bat/autre_etabl/:nomLoc', {templateUrl: 'partials/ajout_bat_autre_etabl_loc.html'})
 	.when('/:idEtabl/ajout_bat/nouveau', {templateUrl: 'partials/ajout_bat_nouveau.html'})
 	.when('/:idEtabl/:idBat', {templateUrl: 'partials/bat.html'})
 	.when('/:idEtabl/:idBat/modif_nom_bat', {templateUrl: 'partials/modif_nom_bat.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat', {templateUrl: 'partials/modif_adresse_bat.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat/:idLoc', {templateUrl: 'partials/modif_adresse_bat_rue.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat/:idLoc/:idRue', {templateUrl: 'partials/modif_adresse_bat_rueno.html'})
 	.when('/:idEtabl/:idBat/modif_adresse_bat/:idLoc/:idRue/:idRueNo', {templateUrl: 'partials/modif_adresse_bat_fin.html'})
 	.when('/:idEtabl/:idBat/modif_salles_bat', {templateUrl: 'partials/modif_salles_bat.html'})
 	.when('/:idEtabl/:idBat/modif_annees_bat', {templateUrl: 'partials/modif_annees_bat.html'})
 	.when('/:idEtabl/:idBat/modif_site_bat', {templateUrl: 'partials/modif_site_bat.html'})
 	.otherwise({redirectTo: '/'});
 }]);
