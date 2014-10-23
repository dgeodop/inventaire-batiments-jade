var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.editNom = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var nom = req.body.nouveauNom;
	var queryEditNom = 'UPDATE bat SET nom_bat=$1 WHERE id_bat=$2';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, nom_bat, id_etabl, date, vu) VALUES ($1, $2, $3, $4, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryEditNom, [nom, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.editNom.queryEditNom', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['modif_nom', idBat, nom, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.editNom.queryAddEvent', err); }
					res.redirect('/api/bat/'+idEtabl+'/'+idBat);
				});
			});
		});
	});
}

exports.editAdr = function(req, res) {
	var idEtabl = req.params.idEtabl;
	var idBat = req.params.idBat;
	var body = req.body;
	var rue = body.rue;
	var rueNo = body.rue_no;
	var npa = body.npa;
	var localite = body.loc;
	var lat = body.lat;
	var lng = body.lng;
	var ctip_loc = body.ctip_loc;
	var noComFed = body.no_com_fed;
	var estrid = body.estrid;
	var egid = body.egid;
	var queryEditAdr = 'UPDATE bat SET rue=$1, no_rue=$2, npa=$3, localite=$4, lat=$5, lng=$6, ctip_localite=$7, no_com_fed=$8, estrid=$9, egid=$10 WHERE id_bat=$11';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryEditAdr, [rue, rueNo, npa, localite, lat, lng, ctip_loc, noComFed, estrid, egid, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.editAdr.queryEditAdr', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['modif_adr', idBat, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.editAdr.queryAddEvent', err); }
					res.status(200).send({ status: "ok"});
				});
			});
		});
	});
}

exports.editAnConstr = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var an = req.body.nouvAnConstr;
	var queryEditAnC = 'UPDATE bat SET annee_constr=$1 WHERE id_bat=$2';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryEditAnC, [an, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.editNom.queryEditAnR', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['modif_an_constr', idBat, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.editNom.queryAddEventAnC', err); }
					res.redirect('/api/bat/'+idEtabl+'/'+idBat);
				});
			});
		});
	});
}

exports.editAnRenov = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var an = req.body.nouvAnRenov;
	var queryEditAnR = 'UPDATE bat SET annee_renov=$1 WHERE id_bat=$2';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryEditAnR, [an, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.editNom.queryEditAnR', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['modif_an_constr', idBat, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.editNom.queryAddEventAnR', err); }
					res.redirect('/api/bat/'+idEtabl+'/'+idBat);
				});
			});
		});
	});
}