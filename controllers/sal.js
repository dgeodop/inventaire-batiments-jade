var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.getAllOfBat = function (req, res) {
	var idBat = req.params.idBat;
	var queryList = 'SELECT sal.id_sal, ref_typ_sal.typ_sal_nom, sal.qte FROM ref_typ_sal, sal WHERE sal.id_typ=ref_typ_sal.id_typ AND id_bat=$1 ORDER BY sal.id_typ';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [idBat], function(err, result) {
			done();
			if(err) { return console.error('sal.getAllOfBat', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}

exports.getAllNotInBat = function (req, res) {
	var idBat = req.params.idBat;
	var queryList = 'SELECT * FROM ref_typ_sal WHERE id_typ NOT IN (SELECT id_typ FROM sal WHERE id_bat=$1) ORDER BY id_typ';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, [idBat], function(err, result) {
			done();
			if(err) { return console.error('sal.getAllNotInBat', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}
