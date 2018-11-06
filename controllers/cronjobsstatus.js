//load database
const Datastore = require('nedb');
const path = require("path");
const db = new Datastore({filename: __dirname + '/cronjobsstatus/cronjobsstatus.db'});
let fs = require('fs');
let db_name = "cronjobsstatus.db";
let Slack = require('slack');
const bot = new Slack();

db.loadDatabase(function (err) {
});

exports.listener = function(req, res){
    res.json({resCode: 200}); //released the request

    let body = req.body;

    if(body && typeof body !== undefined) {
        let slackdb = new Datastore({ filename: __dirname + '/slack/slack.db' });
        slackdb.loadDatabase(function (err) {
        });

        slackdb.find({}, function (err, slackdata) {
            if(!err && slackdata.length > 0){
                let data = slackdata[0];
                let formatted_text = "";
                for(let k = 0; k < body.length; k++) {
                    let out = body[k].output;
                    formatted_text += "Status: " + out[0] + " - Hostname: " + body[k].hostname + " - CronId: " + body[k].cron_id + " - date: "+out[1] + " Error: "+ out[2];
                }
                let token = data.token;

                //Send message to slack
                bot.chat.postMessage({
                    token: token,
                    channel: data.channel,
                    text: formatted_text
                }).then(console.log).catch(console.log);
            }
        });

        //Send message to dashboard
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