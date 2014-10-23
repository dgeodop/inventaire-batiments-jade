var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.getAllEtabl = function (req, res) {
	var queryList = 'SELECT id_etabl, nom_court FROM etabl WHERE util_dgeo=1 ORDER BY nom_court';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryList, null, function(err, result) {
			done();
			if(err) { return console.error('erreur dans la requête', err); }
			var results = JSON.stringify(result.rows);
			res.send(results);
		});
	});
}
