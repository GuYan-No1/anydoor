const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const mime =  require('./mime');
const compress = require('./compress');
const range = require('./range');
const {isFresh} = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res,filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType=mime(filePath);
      res.setHeader('Content-type', contentType);
      if(isFresh(stats,req,res)){
        res.StatusCode = 304;
        return;
      }
      let rs;
      const {code ,start,end} = range(stats.size,req,res);
      if(code === 200){
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      }else{
        res.statusCode = 206;
        rs = fs.createReadStream(filePath,{start,end});
      }
      if(filePath.match(config.compress)){
        rs=compress(rs,req,res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(config.root, filePath);
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      const data = {
        title: path.basename(filePath),
        dir:dir ? `/${dir}` : '',
        files:files.map(file=>{
          return {
            file,
            icon:mime(file)
          };
        })
      };
      res.end(template(data));
    }
  }
  catch (ex) {
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end(`${filePath} is not a directory or file`);
  }
};
