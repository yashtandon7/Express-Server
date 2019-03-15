
var connection = require('./express_mongoConnection.js');
var query = require('./express_databaseQuery.js');

function get(req, res, db) {
    query.getQuery(db, req, res, function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).end('Database error: find command');
        }
        else {
            if (result == '') {
                console.log('No record exist with such name');
                res.status(200).send('No record exist with this name');
            }
            else {
                res.status(200);
                res.send(result);
            }
        }
    });
}


function getAll(req, res, db) {
    query.getAllQuery(db, req, res, function (err, result) {
        if (err) {
            console.log('Error in insert command');
            res.status(500).end('Error in find command');
        } else {
            res.status(200);
            res.send(result);
        }
    });
}

function post(req, res, db) {
    console.log(req.body);
    query.post(db, req, res, function (err, val) {
        if (err) {
            console.log('Error in insert command');
            res.status(500).end('Error in insert command');
        }
        else {
            res.status(200);
            res.send('Data Successfully inserted');
        }
    });
}

function patch(req, res, db) {
    console.log(req.body);
    query.patch(db, req, res, function (err, val) {
        if (err) {
            console.error("Error occurred in update command");
            return res.status(500).end('Error occurred in update command');
        }
        else if (val == 0) {
            console.log("Record has not been updated(patch)");
            res.status(200);
            res.send('Record Does not exist Updated(Hence not updated)');
        }
        else {
            console.log("1 record updated using patch");
            res.status(200);
            res.send('Record Updated Using patch request');
        }
    });
}

function put(req, res, db) {
    console.log(req.body);
    query.put(db, req, res, function (err, val) {
        if (err) {
            console.error("Error occurred in update command");
            return res.status(500).end('Error occurred in update command');
        }
        else if (val == 0) {
            console.log("Record has not been updated(put)");
            res.status(200);
            res.send('Record Does not exist Updated(Hence not updated)');
        }
        else {
            console.log("1 record updated using put");
            res.status(200);
            res.send('Record Updated Using put request');
        }
    });
}

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.post = post;
module.exports.patch = patch;
module.exports.put = put;