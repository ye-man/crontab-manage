//load database
const Datastore = require('nedb');
const path = require("path");
const db = new Datastore({filename: __dirname + '/cronjobsstatus/cronjobsstatus.db'});
let fs = require('fs');
let db_name = "cronjobsstatus.db";
const exec = require('child_process').exec;
let ssh_key_path = "~/.ssh/id_rsa.pub";



db.loadDatabase(function (err) {
    if (err) throw err; // no hope, just terminate
});

exports.listener = function(req, res){
    res.json({resCode: 200}); //released the request
    let body = req.body;
    if(body && typeof body !== undefined) {
        socket.emit("cronsstatus", body);
    }

};

exports.list = function(callback){
    var db = new Datastore({ filename: __dirname + '/cronjobsstatus/' + db_name });
    db.loadDatabase(function (err) {
    });
    db.find({}).sort({ created: -1 }).exec(function(err, docs){
        callback(docs);
    });
};

exports.get = function(req, res){
    var db = new Datastore({ filename: __dirname + '/cronjobsstatus/' + db_name });
    db.loadDatabase(function (err) {
    });
    db.find({}).sort({ created: -1 }).exec(function(err, docs){
        res.json(docs);
    });
};

exports.delete = function(){
    fs.unlink(__dirname + '/cronjobsstatus/' + db_name);
};

exports.create_new = function(req, res){

};

exports.update = function(data){
    db.update({_id: data._id}, data);
};

exports.status = function(_id, stopped){
    db.update({_id: _id},{$set: {stopped: stopped}});
};

exports.remove = function(data){
    db.remove({_id: data._id}, {});
};