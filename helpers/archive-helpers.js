var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    data = data.split("\n");
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  console.log('checking in list',url);
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    console.log(data, 'inside');
    if(err){
      console.log(err);
    }
    data = data.split("\n");
    if(data.indexOf(url) !== -1){
      console.log('true');
      callback(true);

    }else{
      console.log('false');
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', callback);
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, callback);
};

exports.downloadUrls = function(urlArray) {
  urlArray.forEach(function(value){
    var fixturePath = exports.paths.archivedSites + "/" + value;
    var siteData = '';
    request.get('http://' + value).on('data',function(data){
      siteData += data;
    }).on('end', function(){
      fs.writeFile(fixturePath,siteData,'utf8');
    });

    
  });
};

// fs.readFile(exports.paths.list, 'utf8', function(err,data){
//   data = data.split('\n');
//   exports.downloadUrls(data);
// })
