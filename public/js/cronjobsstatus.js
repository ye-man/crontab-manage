
let socket = io();
let i = 0;
let LIMIT_ROWS = 100;
let filter = {};
socket.on("cronsstatus", function (data) {
    if(typeof data.cron_id !== undefined && data.length > 0){
        if(i <= LIMIT_ROWS) {
            for(let k = 0; k < data.length; k++) {
                let cron_id = data[k].cron_id;
                let hostname = data[k].hostname;
                let identifier = cron_id + '_' + hostname;

                if(!filter[identifier]) {
                    filter[identifier] = identifier;
                    let out = data[k].output;
                    let con = '';
                    con += '<tr>';
                    con += '<td>' + i + '</td>';
                    con += '<td>' + data[k].hostname + '</td>';
                    con += '<td>' + data[k].cron_id + '</td>';
                    con += '<td>' + out[1] + '</td>';
                    con += '<td>' + out[2] + '</td>';
                    con += '<td>' + out[0].split('@')[1] + '</td>';
                    con += '</tr>';
                    i++;
                    $('#tbody').append(con);
                }
            }
        }
    }else{
        $('#tbody').html('Your system has no errors');
    }
});
