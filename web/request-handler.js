var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, x-parse-application-id, x-parse-rest-api-key",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === "/") {
      fs.readFile("./web/public/index.html",'utf8', function(err, data) {
        if (err) {
        }
        headers['Content-Type'] = "text/html";
        res.writeHead(200, headers);
        res.end(data);
      });
    }else{
      fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data){
        if(err){
          res.writeHead(404, headers);
          res.end();
        }else{
          headers['Content-Type'] = "text/html";
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    }
  }else if (req.method === 'POST') {
    var data = "";
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function(){
      data = data.slice(4);
      fs.appendFile(archive.paths.list, data + '\n', function(){
        res.writeHead(302, headers);
        res.end();
      })
    })
  }
};