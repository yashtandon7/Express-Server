var MongoClient = require('mongodb').MongoClient; 
var url = "mongodb://localhost:27017/tandon";
var back = require('./express_serverBackend.js');
function getConnection(callback){
    MongoClient.connect(url, function(err, db) {
        if (err){
            return callback(err,null);
        }
        else{
            return callback(err,db);
        } 
    });   
}

module.exports.getConnection = getConnection;