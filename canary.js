var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1', {}) ;
var http      = require('http');
var httpProxy = require('http-proxy');
var exec = require('child_process').exec;
var request = require("request");

var CHECKBOX  = 'http://34.209.184.165:80';

var PROD1 = 'http://54.71.230.63:80/';
var PROD2 = 'http://52.24.24.173:80/';
// var PROD3 = 'http://34.209.32.244:80/';

var CANARY = 'http://34.209.32.244:80/'; 

var TARGET = PROD1;
var requestNum = 1;

client.flushdb( function (err, succeeded) {

});

client.lpush("prodservers",PROD1);
client.lpush("prodservers",PROD2);
// client.lpush("prodservers",PROD3);

client.lpush("canaryservers", CANARY);

var infrastructure =
{
  setup: function()
  {
    // Proxy.
    var options = {};
    var proxy   = httpProxy.createProxyServer(options);
    var server  = http.createServer(function(req, res)
    { 
         client.get("canary", function(err,value){ 
            if(value && requestNum % 3 == 0 ){
               client.rpoplpush("canaryservers","canaryservers",function(err, value){
                  console.log("\nCanary server sending request to port " + value );
                  TARGET = value;
                  proxy.web(req, res, { target: TARGET });
               });
            }else{
               client.rpoplpush("prodservers","prodservers",function(err, value){
                  console.log("\nProxy server sending request to port " + value );
                  TARGET = value;
                  proxy.web(req, res, { target: TARGET });
               });
            }
            requestNum++;
         });
    });
    server.listen(8080);

  },

  teardown: function()
  {
    exec('forever stopall', function()
    {
      console.log("infrastructure shutdown");
      process.exit();
    });
  },
}

infrastructure.setup();

process.on('exit', function(){infrastructure.teardown();} );
process.on('SIGINT', function(){infrastructure.teardown();} );
process.on('uncaughtException', function(err){
  console.error(err);
  infrastructure.teardown();} );
