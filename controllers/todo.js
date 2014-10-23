var pg = require('pg');
var bd = require('../credentials/bd');
var connectString = 'tcp://' + bd.username + ':' + bd.password + '@localhost/postgres';

exports.getAll = function (req, res) {
	var queryList = 'SELECT * FROM todo ORDER BY id';
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

exports.add = function (req, res) {
	var name = req.body.name;	
	var queryInsert = 'INSERT INTO todo (name) VALUES ($1)';
	var queryList = 'SELECT * FROM todo ORDER BY id';
pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryInsert, [name], function(err, result) {
			done();
			if(err) { return console.error('erreur dans la requête', err); }
			pg.connect(connectString, function(err, client, done) {
				if(err) { return console.error('erreur de connection au serveur', err); }
				client.query(queryList, null, function(err, result) {
					done();
					if(err) { return console.error('erreur dans la requête', err); }
					var results = JSON.stringify(result.rows);
					res.send(results);
				});
			});
		});
	});
}

exports.editView = function (req, res) {
	var id = req.params.id;	
	var queryOne = 'SELECT * FROM todo WHERE id=$1';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryOne, [id], function(err, result) {
			done();
			if(err) { return console.error('erreur dans la requête', err); }
			var todo = JSON.stringify(result.rows[0]);
			res.send(todo);
		});
	});
}

exports.edit = function (req, res) {
	var name = req.body.name;
	var id = req.params.id;	
	var queryEdit = 'UPDATE todo SET name=$1 WHERE id=$2';
	var queryList = 'SELECT * FROM todo ORDER BY id';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryEdit, [name, id], function(err, result) {
			done();
			if(err) { return console.error('erreur dans la requête', err); }
			pg.connect(connectString, function(err, client, done) {
				if(err) { return console.error('erreur de connection au serveur', err); }
				client.query(queryList, null, function(err, result) {
					done();
					if(err) { return console.error('erreur dans la requête', err); }
					var results = JSON.stringify(result.rows);
					res.send(results);
				});
			});
		});
	});
}

exports.delete = function (req, res) {
	var id = req.params.id;	
	var queryDelete = 'DELETE FROM todo WHERE id=$1';
	var queryList = 'SELECT * FROM todo ORDER BY id';
	pg.connect(connectString, function(err, client, done) {
		if(err) { return console.error('erreur de connection au serveur', err); }
		client.query(queryDelete, [id], function(err, result) {
			done();
			if(err) { return console.error('erreur dans la requête', err); }
			pg.connect(connectString, function(err, client, done) {
				if(err) { return console.error('erreur de connection au serveur', err); }
				client.query(queryList, null, function(err, result) {
					done();
					if(err) { return console.error('erreur dans la requête', err); }
					var results = JSON.stringify(result.rows);
					res.send(results);
				});
			});
		});
	});
}


