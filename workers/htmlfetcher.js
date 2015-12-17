// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http");
var handler = require("../web/request-handler");
var initialize = require("../web/initialize.js");
var archive = require('../helpers/archive-helpers');
var $ = require('../bower_components/jquery/dist/jquery');


// setTimeout(function(){
//   fs.readFile(archive.paths.list, 'utf8', function(err,data){
//   data = data.split('\n');
//   archive.downloadUrls(data);
//   })
// },30000);


