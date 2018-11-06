//load database
const Datastore = require('nedb');
const path = require("path");
const db = new Datastore({filename: __dirname + '/slack/slack.db'});
let fs = require('fs');
let db_name = "slack.db";

db.loadDatabase(function (err) {
    if (err) throw err; // no hope, just terminate
});

exports.list = function(callback){
    var db = new Datastore({ filename: __dirname + '/slack/' + db_name });
    db.loadDatabase(function (err) {
    });
    db.find({}).sort({ created: -1 }).exec(function(err, docs){
        callback(docs);
    });
};

exports.get = function(req, res){
    var db = new Datastore({ filename: __dirname + '/slack/' + db_name });
    db.loadDatabase(function (err) {
    });
    db.find({}).sort({ created: -1 }).exec(function(err, docs){
        res.json(docs);
    });
};

exports.delete = function(){
    fs.unlink(__dirname + '/slack/' + db_name);
};

exports.create_new = function(req, res){
    let body = req.body;
    let db = new Datastore({ filename: __dirname + '/slack/' + db_name });
    db.loadDatabase(function (err) {
    });
    db.find({}, function (err, slacks) {
        if(!err && slacks.length > 0){
            return res.json({resCode: 400, err: "Slack already exist"});
        }else{
            db.insert(body);
            return res.json({resCode: 200, message: "New slack created"});
        }

    });

};

exports.update = function(data){
    db.update({_id: data._id}, data);
};

exports.remove = function(data){
    db.remove({_id: data._id}, {});
};