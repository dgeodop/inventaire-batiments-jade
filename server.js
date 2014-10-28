var express = require('express');
var bodyParser = require('body-parser');

var ctrlEtabl = require('./controllers/etabl');
var ctrlBat = require('./controllers/bat');
var ctrlPostBat = require('./controllers/postbat');
var ctrlSal = require('./controllers/sal');
var ctrlPostSal = require('./controllers/postsal');
var ctrlAdr = require('./controllers/adr');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/partials', express.static(__dirname + '/client/partials'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/etabl', ctrlEtabl.getAllEtabl);
app.get('/api/bat/:idEtabl', ctrlBat.getAllBatOfEtabl);
app.get('/api/ancienbat/:idEtabl', ctrlBat.getAllAncienBatOfEtabl);
app.get('/api/bat/:idEtabl/:idBat', ctrlBat.getOne);
app.get('/api/locbat/', ctrlBat.getAllLocWhereBat);
app.get('/api/batinloc/:idEtabl/:nomLoc', ctrlBat.getAllBatInLoc);

app.post('/api/bat/:idEtabl/:idBat/add/ancien', ctrlPostBat.addAncienBat);
app.post('/api/bat/:idEtabl/:idBat/add/autretabl', ctrlPostBat.addAutreEtablBat);
app.post('/api/bat/:idEtabl/add/nouveau', ctrlPostBat.addNewBat);
app.post('/api/bat/:idEtabl/:idBat/del', ctrlPostBat.delBat);
app.post('/api/bat/:idEtabl/:idBat/nom', ctrlPostBat.editNom);
app.post('/api/bat/:idEtabl/:idBat/anconstr', ctrlPostBat.editAnConstr);
app.post('/api/bat/:idEtabl/:idBat/anrenov', ctrlPostBat.editAnRenov);
app.post('/api/bat/:idEtabl/:idBat/site', ctrlPostBat.editSite);

app.get('/api/sal/:idEtabl/:idBat', ctrlSal.getAllOfBat);
app.get('/api/sal/:idEtabl/:idBat/notinbat', ctrlSal.getAllNotInBat);
app.post('/api/sal/:idEtabl/:idBat/:idSal/qte', ctrlPostSal.editQte);
app.post('/api/sal/:idEtabl/:idBat/:idSal/del', ctrlPostSal.delSal);
app.post('/api/sal/:idEtabl/:idBat/new', ctrlPostSal.newSal);

app.get('/api/adr/loc', ctrlAdr.getLocalite);
app.get('/api/adr/loc/:idLoc', ctrlAdr.getRue);
app.get('/api/adr/loc/:idLoc/rue/:idRue', ctrlAdr.getRueNo);
app.get('/api/adr/loc/:idLoc/rue/:idRue/no/:idRueNo', ctrlAdr.getAdr);
app.post('/api/bat/:idEtabl/:idBat/adr', ctrlPostBat.editAdr);



app.listen(3000, function() { console.log('Listening on 3000'); });
