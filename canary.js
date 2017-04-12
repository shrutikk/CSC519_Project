var http      = require('http');
var httpProxy = require('http-proxy');
var exec = require('child_process').exec;
var request = require("request");

var CHECKBOX  = 'http://34.209.184.165:80';
var BLUE  = 'http://127.0.0.1:9090';

var TARGET = CHECKBOX;
var requestNum = 1;
var infrastructure =
{
  setup: function()
  {
    // Proxy.
    var options = {};
    var proxy   = httpProxy.createProxyServer(options);
    var server  = http.createServer(function(req, res)
    {
         proxy.web( req, res, {target: TARGET } );
    });
    server.listen(8080);

    // Launch green slice

//setTimeout
//var options = 
//{
//  url: "http://localhost:8080",
//};
//request(options, function (error, res, body) {

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

// setInterval(function(){
//    request(BLUE, function(err,x,y){
//       if( x.statusCode == 500)
//       {
//          TARGET = GREEN;
//       }
//    });
// },2000);
// Make sure to clean up.
process.on('exit', function(){infrastructure.teardown();} );
process.on('SIGINT', function(){infrastructure.teardown();} );
process.on('uncaughtException', function(err){
  console.error(err);
  infrastructure.teardown();} );
