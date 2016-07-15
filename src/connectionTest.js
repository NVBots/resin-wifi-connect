var dns = require('dns');
var exec = require('child_process').exec;

function ping(url, cb){
    exec('ping -c 1 ' + url, cb);
}

function startConnectionTest(onConnected, timeout, url){
    timeout = typeof timeout !== 'undefined' ? timeout : 1000;
    url = typeof url !== 'undefined' ? url : '8.8.8.8';

    var onResponse = function(err){
        if(err){
            setTimeout(function(){
                console.log('Ping: ' + url);
                ping(url, onResponse);
            }, timeout);
            return;
        } else {
            return onConnected();
        }
    }
    console.log('Ping: ' + url);
    return ping(url, onResponse);
}

module.exports = startConnectionTest;