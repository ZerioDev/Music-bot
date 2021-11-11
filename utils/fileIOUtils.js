var fs = require('fs')
var path = require('path')
var getDirName = require('path').dirname;

const projectRoot = __dirname + "/../" //__dirname points to this file location

//write file to path relative from project root
module.exports.writeFile = function(filePath, contents, cb) {
  var relativePath = path.join(projectRoot + filePath)
  fs.mkdir(getDirName(relativePath), { recursive: true}, function (err) {
    if (err) return cb("[File IO error] "+ err);
  
    //Check if file exist
    if(fs.existsSync(relativePath)){
      return cb("Already Exist");
    }else{
      fs.writeFile(relativePath, contents, cb);
    }
  });
}

//read file to path relative from project root
module.exports.readFile = function(filePath){
  var relativePath = path.join(projectRoot + filePath)
  return fs.readFileSync(relativePath);
}

//read json file
module.exports.readJsonFile = function(filePath){
  return JSON.parse(this.readFile(filePath +".json"));
}

//delete file
module.exports.deleteFile = function(filePath, cb){
  var relativePath = path.join(projectRoot + filePath);
  
  //check if file exist
  if(!fs.existsSync(relativePath)){
    return cb("Not Exists");
  }

  fs.unlink(relativePath, function(err){
    if(err) return cb("[File IO Error]" + err);
  });
}

module.exports.listDir = function(dirPath, cb){
  var relativePath = path.join(projectRoot + dirPath)

  if(!fs.existsSync(relativePath)){
    return cb("Not Exist");
  }

  var files = fs.readdirSync(dirPath, function(err){
    return cb("[File IO Error]" + err);
  });

  return files;
}