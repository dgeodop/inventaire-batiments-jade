var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.delBat = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var queryDelBat = 'UPDATE bat_dgeo SET util=0 WHERE id_etabl=$1 AND id_bat=$2';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryDelBat, [idEtabl, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.delBat.queryDelBat', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['suppr_bat', idBat, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.delBat.queryAddEvent', err); }
					res.send('ok').status(200);
				});
			});
		});
	});
}

exports.addAncienBat = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var queryAddBat = 'UPDATE bat_dgeo SET util=1 WHERE id_etabl=$1 AND id_bat=$2';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryAddBat, [idEtabl, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.addAncienBat.queryAddBat', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['add_bat_ancien', idBat, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.delBat.queryAddEvent', err); }
					res.send('ok').status(200);
				});
			});
		});
	});
}

exports.addAutreEtablBat = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var queryGetIdBatDgeo = 'SELECT max(id_bat_dgeo) + 1 AS id_bat_dgeo FROM bat_dgeo WHERE id_etabl=$1';
	var queryAddToBatDgeo = 'INSERT INTO bat_dgeo (id_bat, id_bat_dgeo, id_etabl, util) VALUES ($1,$2,$3, 1)';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryGetIdBatDgeo, [idEtabl], function(err, result) {
			done();
			if(err) { return console.error('postbat.addAutreEtablBat.queryGetIdBatDgeo', err); }
			var idBatDgeo = result.rows[0].id_bat_dgeo;
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddToBatDgeo, [idBat, idBatDgeo, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.addAutreEtablBat.queryAddToBatDgeo', err); }
					pg.connect(connectString, function(err, client, done) {
						client.query(queryAddEvent, ['ajout_bat_autre_etabl', idBat, idEtabl], function(err, result) {
							done();
							if(err) { return console.error('postbat.addAutreEtablBat.queryAddEvent', err); }
							res.send('ok').status(200);
						});
					});
				});
			});
		});
	});
}

exports.addNewBat = function(req, res) {
	var idEtabl = req.params.idEtabl;
	var nomBat = req.body.nomBat;
	var queryGetIdBat = 'SELECT max(id_bat) + 1 AS id_bat FROM bat';
	var queryAddToBat = 'INSERT INTO bat (id_bat, nom_bat) VALUES ($1, $2);'
	var queryGetIdBatDgeo = 'SELECT max(id_bat_dgeo) + 1 AS id_bat_dgeo FROM bat_dgeo WHERE id_etabl=$1';
	var queryAddToBatDgeo = 'INSERT INTO bat_dgeo (id_bat, id_bat_dgeo, id_etabl, util) VALUES ($1,$2,$3, 1)';
	var queryAddEvent = 'INSERT INTO event (typ_event, id_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryGetIdBat, null, function(err, result) {
			done();
			if(err) { return console.error('postbat.addAutreEtablBat.queryGetIdBat', err); }
			var idBat = result.rows[0].id_bat;
			var resultIdBat = result.rows[0]; 
			pg.connect(connectString, function(err, client, done) {
				if(err) { return console.error('erreur de connection au serveur', err); }
				client.query(queryAddToBat, [idBat, nomBat], function(err, result) {
					done();
					if(err) { return console.error('postbat.addAutreEtablBat.queryAddToBat', err); }
					pg.connect(connectString, function(err, client, done) {
						if(err) { return console.error('erreur de connection au serveur', err); }
						client.query(queryGetIdBatDgeo, [idEtabl], function(err, result) {
							done();
							if(err) { return console.error('postbat.addAutreEtablBat.queryGetIdBatDgeo', err); }
							var idBatDgeo = result.rows[0].id_bat_dgeo;
							pg.connect(connectString, function(err, client, done) {
								client.query(queryAddToBatDgeo, [idBat, idBatDgeo, idEtabl], function(err, result) {
									done();
									if(err) { return console.error('postbat.addAutreEtablBat.queryAddToBatDgeo', err); }
									pg.connect(connectString, function(err, client, done) {
										client.query(queryAddEvent, ['ajout_nouveau_bat', idBat, idEtabl], function(err, result) {
											done();
											if(err) { return console.error('postbat.addAutreEtablBat.queryAddEvent', err); }
											res.send(resultIdBat);
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}


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

exports.editSite = function(req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var site = req.body.nouveauSite;
	var queryEditSite = 'UPDATE bat SET site=$1 WHERE id_bat=$2';
	var queryAddEvent = 'INSERT INTO event (typ_event, nom_bat, id_etabl, date, vu) VALUES ($1, $2, $3, now(), 0)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryEditSite, [site, idBat], function(err, result) {
			done();
			if(err) { return console.error('postbat.editSite.queryEditNom', err); }
			pg.connect(connectString, function(err, client, done) {
				client.query(queryAddEvent, ['modif_site', idBat, idEtabl], function(err, result) {
					done();
					if(err) { return console.error('postbat.editNom.queryAddEvent', err); }
					res.redirect('/api/bat/'+idEtabl+'/'+idBat);
				});
			});
		});
	});
}
