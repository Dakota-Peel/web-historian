var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
        fs.readFile(asset,'utf8', function(err, data) {
        if (err) {

          console.log('err',err);
        }
        var ext = asset.split('.');
        ext = ext[ext.length-1];
        console.log('ext',ext);

        if(ext === 'html' || ext === 'com'){
           headers['Content-Type'] = "text/html";
        }else if(ext === 'css'){
           headers['Content-Type'] = "text/css";
        }else if(ext === 'jpg'){
           headers['Content-Type'] = "image/jpeg";
        }else if(ext === 'png'){
           headers['Content-Type'] = "image/png";
        }




        console.log('data', data, 'headers',headers);
        res.writeHead(200, headers);
        res.end(data);
      });
};



// As you progress, keep thinking about what helper functions you can put here!
