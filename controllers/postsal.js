var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.editQte = function (req, res) {
	var body = req.body;
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var idSal = req.params.idSal;
	var qte = req.body.nouvQte; 
	var query = 'UPDATE sal SET qte=$1 WHERE id_sal=$2';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(query, [qte, idSal], function(err, result) {
			done();
			if(err) { return console.error('postsal.postQte', err); }
			res.redirect('/api/sal/' + idEtabl + '/' + idBat);
		});
	});
}

exports.delSal = function (req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var idSal = req.params.idSal;
	var query = 'DELETE FROM sal WHERE id_sal=$1';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(query, [idSal], function(err, result) {
			done();
			if(err) { return console.error('postsal.delSal', err); }
				res.redirect('/api/sal/' + idEtabl + '/' + idBat);
		});
	});
}

exports.newSal = function (req, res) {
	var idBat = req.params.idBat;
	var idEtabl = req.params.idEtabl;
	var idSal = req.params.idSal;
	var idTyp = req.body.newTypSal;
	var qte = req.body.qte;
	var query = 'INSERT INTO sal (id_typ, id_bat, qte) VALUES ($1,$2,$3)';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(query, [idTyp, idBat, qte], function(err, result) {
			done();
			if(err) { return console.error('postsal.newSal', err); }
				res.status(200).send({ status: "ok"});
		});
	});
}
