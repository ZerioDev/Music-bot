var fs = require('fs')
var path = require('path')
var getDirName = require('path').dirname;

const projectRoot = __dirname + "/../" //__dirname points to this file location


module.exports.writeFile = function(filePath, contents, cb) {
  var relativePath = path.join(projectRoot + filePath)
  fs.mkdir(getDirName(relativePath), { recursive: true}, function (err) {
    if (err) return cb("[File IO error] "+ err);

    if(fs.existsSync(relativePath)){
      return cb("Already Exist");
    }else{
      fs.writeFile(relativePath, contents, cb);
    }
  });
}

module.exports.readFile = function(filePath){
  var relativePath = path.join(projectRoot + filePath)
  return fs.readFileSync(relativePath);
}

module.exports.readJsonFile = function(filePath){
  return JSON.parse(this.readFile(filePath +".json"));
}