var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.getAllBatOfEtabl = function (req, res) {
	var idEtabl = req.params.idEtabl
	var queryList = 'SELECT bat.id_bat, nom_bat FROM bat, bat_dgeo WHERE bat.id_bat=bat_dgeo.id_bat AND id_etabl=$1 AND util=1 ORDER BY id_bat_dgeo';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [idEtabl], function(err, result) {
			done();
			if(err) { return console.error('bat.getAllBatOfEtabl', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}

exports.getAllAncienBatOfEtabl = function (req, res) {
	var idEtabl = req.params.idEtabl
	var queryList = 'SELECT bat.id_bat, nom_bat FROM bat, bat_dgeo WHERE bat.id_bat=bat_dgeo.id_bat AND id_etabl=$1 AND util=0 ORDER BY id_bat_dgeo';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [idEtabl], function(err, result) {
			done();
			if(err) { return console.error('bat.getAllAncienBatOfEtabl', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}

exports.getAllLocWhereBat = function (req, res) {
	var idEtabl = req.params.idEtabl
	var queryList = 'SELECT DISTINCT localite FROM bat WHERE id_bat NOT IN (SELECT id_bat FROM bat_dgeo WHERE id_etabl=$1) ORDER BY localite';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [idEtabl], function(err, result) {
			done();
			if(err) { return console.error('bat.getAllLocWhereBat', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}

exports.getAllBatInLoc = function (req, res) {
	var nomLoc = req.params.nomLoc
	var idEtabl = req.params.idEtabl
	var queryList = 'SELECT * FROM bat WHERE localite=$1 AND id_bat NOT IN (SELECT id_bat FROM bat_dgeo WHERE id_etabl=$2) ORDER BY nom_bat';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [nomLoc, idEtabl], function(err, result) {
			done();
			if(err) { return console.error('bat.getAllBatInLoc', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}

exports.getOne = function (req, res) {
	var idBat = req.params.idBat;
	var queryList = 'SELECT  * FROM bat WHERE id_bat=$1';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [idBat], function(err, result) {
			done();
			if(err) { return console.error('bat.getOne', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}
