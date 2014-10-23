var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.getLocalite = function(req, res) {
	var query = 'SELECT id_loc, npa, loc FROM loc ORDER BY loc';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('Problème de connection à la base de données', err); }
		client.query(query, false, function(err, result) {
		  done();
		  if(err) { return console.error('adr.getLocalite', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
};

exports.getRue = function(req, res) {
	var idLoc = req.params.idLoc;
	var query = 'SELECT id_rue, rue FROM rue WHERE id_loc=$1 ORDER BY rue';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('Problème de connection à la base de données', err); }
		client.query(query, [idLoc], function(err, result) {
		  done();
		  if(err) { return console.error('adr.getRue', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
};

exports.getRueNo = function(req, res) {
	var idRue = req.params.idRue;
	var query = 'SELECT id_rue_no, rue_no FROM rue_no WHERE id_rue=$1 ORDER BY rue_no';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('Problème de connection à la base de données', err); }
		client.query(query, [idRue], function(err, result) {
		  done();
		  if(err) { return console.error('adr.getRueNo', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
};

exports.getAdr = function(req, res) {
	var idRueNo = req.params.idRueNo;
	var query = 'SELECT rue.rue, rue_no.rue_no, rue.no_com_fed, loc.npa, loc.loc, loc.ctip_loc, rue_no.lat, rue_no.lng, rue.no_com_fed, estrid, egid FROM rue, rue_no, loc WHERE rue_no.id_rue=rue.id_rue AND rue.id_loc=loc.id_loc AND id_rue_no=$1';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('Problème de connection à la base de données', err); }
		client.query(query, [idRueNo], function(err, result) {
		  done();
		  if(err) { return console.error('adr.getAdr', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
};

exports.postAdr = function(req, res) {
	var idEtabl = req.params.idEtabl;
	var idBat = req.params.idBat;
	var body = req.body;
	var rue = body.rue;
	var rueNo = body.rue_no;
	var npa = body.npa;
	var localite = body.localite;
	var lat = body.lat;
	var lng = body.lng;
	var ctip_loc = body.ctipLoc;
	var noComFed = body.noComFed;
	var estrid = body.estrid;
	var egid = body.egid;
	var queryUpdateAdr = 'UPDATE bat SET rue=$1, no_rue=$2, npa=$3, localite=$4, lat=$5, lng=$6, ctip_localite=$7, no_com_fed=$8, estrid=$9, egid=$10 WHERE id_bat=$11';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, nom_bat, id_etabl, date, vu) VALUES ($1, $2, $3, $4, now(), 0)';
	pg.connect(conString, function(err, client, done) {
		if(err) { return console.error('Problème de connection à la base de données', err); }
		client.query(queryUpdateAdr, [rue, rueNo, npa, localite, lat, lng, ctip_loc, noComFed, estrid, egid, idBat], function(err, result) {
			done();
			if(err) { return console.error('adr.postAdr.queryUpdateAdr', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['modif_nom', idBat, nom, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('adr.postAdr.queryAddEvent', err); }
					res.redirect('/api/bat/'+idEtabl+'/'+idBat);
				});
			});
		});
	});
};
