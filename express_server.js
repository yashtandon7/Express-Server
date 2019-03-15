var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var backend = require('./express_serverBackend.js');
var connection = require('./express_mongoConnection.js');
var _db;

app.use('/mongonode.com', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

function getCon(callback) {
	connection.getConnection(function (error, db) {
		if (error) {
			return callback(error, null);
		}
		else {
			return callback(error, db);
		}
	});
}

getCon(function (error, _db) {
	if (error) {
		console.log(error);
	}
	else {
		console.log('Database Connection Established');
		//get request (By Name)
		app.get('/name', function (req, res) {
			backend.get(req, res, _db);
		});

		//getAll request (all records of database)
		router.get('/all', function (req, res) {
			backend.getAll(req, res, _db);
		});

		//post request (To insert record in database)
		app.post('/insert', function (req, res) {
			backend.post(req, res, _db);
		});

		//Patch request (By Body) {age getting modified using name field}
		app.patch('/patch', function (req, res) {
			backend.patch(req, res, _db);
		});

		//Put request (By params)
		app.put('/getData/:name/:lastName', function (req, res) {
			console.log(req.params);
			res.status(200).end('PUT(params) request successfull');
		});

		//Put request (By query)
		app.put('/', function (req, res) {
			console.log(req.query);
			res.status(200).end('PUT(query) request successfull');
		});

		//Put request (By Body)
		app.put('/yash', function (req, res) {
			backend.put(req, res, _db);
		});
	}
});
app.listen(3040);

