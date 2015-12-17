var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
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

      httpHelpers.serveAssets(res, "./public/index.html");
    }else if (req.url === "/styles.css") {
      httpHelpers.serveAssets(res, "./public/styles.css");

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
    // headers['Content-Type'] = "text/html";
    var data = "";
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function(){
      data = data.slice(4);
      if(/*archive.isUrlArchived(data)*/ true) {
        console.log('past return');

          httpHelpers.serveAssets(res, "../archives/sites/" + data );

      }else if(archive.isUrlInList(data)) {
        fs.readFile("./public/loading.html",'utf8', function(err, data) {
          if (err) {
            console.log('error' ,err);
          }
          console.log('in list');
          headers['Content-Type'] = "text/html";
          res.writeHead(200, headers);
          res.end(data);
        });        
      }else{
        archive.addUrlToList(data, function(){
          res.writeHead(302, headers);
          res.end();
        });
      }
    }); 
  }
  fs.readFile(archive.paths.list, 'utf8', function(err,data){
    if(data !== '/'){
      data = data.trim().split('\n');
      archive.downloadUrls(data);
    } 
  });
};