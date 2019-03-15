var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tandon";

function getQuery(db, req, res, callback) {
	let name_search = req.query.name;
	console.log(name_search);
	try {
		if (name_search == "yash") {
			var error = new Error("Error Occurred");
			throw error;
		}
		else {
			var name_search_obj = { name: name_search }
			db.collection("test").find(name_search_obj).toArray(function (error, result) {
				if (error) { throw error };
				return callback(error, result);
			});
		}
	}
	catch (error) {
		console.log("UserDefined Error");
		return callback(error, null);
	}
}

function getAllQuery(db, req, res, callback) {
	db.collection("test").find({}).toArray(function (err, result) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(err, result);
		}
	});
}

function post(db, req, res, callback) {
	var name1 = req.body.name;
	var age1 = req.body.age;
	var address1 = req.body.address;
	var myobj =
	{
		name: name1, age: age1, address: address1
	};
	console.log(myobj);
	db.collection("test").insert(myobj, function (err) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(err, 1);
		}
	});
}

function patch(db, req, res, callback) {
	var name1 = req.body.name;
	var age1 = req.body.age;
	//var address1 = req.body.address;
	var myobjname = { name: name1 };
	var myobj =
	{
		age: age1
	};
	db.collection("test").update(myobjname, { $set: myobj }, function (err, result) {
		//db.collection("test").update({name: "Tom Moody"},{$set:{age: 101}}, function(err, result) {
		if (err) {
			return callback(err, null);
		}
		else {
			if (result.result.nModified !== 0) {
				return callback(err, result.result.nModified);
			}
			else {
				return callback(err, 0);
			}
		}
	});
}

function put(db, req, res, callback) {
	var name1 = req.body.name;
	var age1 = req.body.age;
	var address1 = req.body.address;
	var myobjname = { name: name1 };
	var myobj =
	{
		name: name1, age: age1, address: address1
	};

	db.collection("test").update(myobjname, myobj, function (err, result) {
		if (err) {
			return callback(err, null);
		}
		else {
			if (result.result.nModified !== 0) {
				return callback(err, result.result.nModified);
			}
			else {
				return callback(err, 0);
			}
		}
	});
}

module.exports.getQuery = getQuery;
module.exports.getAllQuery = getAllQuery;
module.exports.post = post;
module.exports.patch = patch;
module.exports.put = put;