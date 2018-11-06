/*jshint esversion: 6 */
/*********** MessageBox ****************/
// simply show info.  Only close button
function infoMessageBox(message, title){
    $("#info-body").html(message);
    $("#info-title").html(title);
    $("#info-popup").modal('show');
}
// like info, but for errors.
function errorMessageBox(message) {
    var msg =
        "Operation failed: " + message + ". " +
        "Please see error log for details.";
    infoMessageBox(msg, "Error");
}
// modal with full control
function messageBox(body, title, ok_text, close_text, callback){
    $("#modal-body").html(body);
    $("#modal-title").html(title);
    if (ok_text) $("#modal-button").html(ok_text);
    if(close_text) $("#modal-close-button").html(close_text);
    $("#modal-button").unbind("click"); // remove existing events attached to this
    $("#modal-button").click(callback);
    $("#popup").modal("show");
}


function newJob(){

    $("#add_slack").modal("show");

    $("#slack-channel").val("");
    $("#slack-token").val("");


    $("#slack-save").unbind("click"); // remove existing events attached to this
    $("#slack-save").click(function(){

        let fields = ['slack-channel', 'slack-token'];
        let errors = validateFields(fields);

        let channel = $("#slack-channel").val();
        let token = $("#slack-token").val();
        var data = {channel: channel, token: token};

        if(errors){
            alert("Please fill the form");
            return false;
        }
        loader('show');

        $.post(routes.slack_api.add, data, function(response){
            if(response.resCode === 400){ toastr.error(JSON.stringify(response.err)); } else { location.reload(); }
        });
    });
}

function editJob(_id){
    var slack = null;
    slacks.forEach(function(slk){
        if(slk._id === _id)
            slack = slk;
    });
    if(slack) {

        $("#add_slack").modal("show");

        $("#slack-channel").val(slack.channel);
        $("#slack-token").val(slack.token);
    }

    $("#slack-save").unbind("click"); // remove existing events attached to this
    $("#slack-save").click(function(){

        let fields = ['slack-channel', 'slack-token'];
        let errors = validateFields(fields);

        let channel = $("#slack-channel").val();
        let token = $("#slack-token").val();
        var data = {channel: channel, token: token, _id: slack._id};

        if(errors){
            alert("Please fill the form");
            return false;
        }
        loader('show');

        $.post(routes.slack_api.update, data, function(response){
            if(response.resCode === 400){ toastr.error(JSON.stringify(response.err)); } else { location.reload(); }
        });
    });
}

function deleteJob(_id){
    // TODO fix this. pass callback properly
    messageBox("<p> Do you want to delete this slack job? </p>", "Confirm delete", null, null, function(){
        loader('show');
        $.post(routes.slack_api.remove, {_id: _id}, function(response){
            if(response.resCode === 400){ toastr.error(JSON.stringify(response.err)); } else { location.reload(); }
        });
    });
}

function validateFields(fields){
    let error = false;
    for(var i = 0; i < fields.length; i++){
        let field = fields[i];
        if($('#'+field).val() === ''){
            error = true;
            break;
        }
    }
    return error;
}

function loader(bool) {
    if(bool === 'show'){
        $('.loader').css('display', 'block');
    }else{
        $('.loader').css('display', 'none');
    }

}