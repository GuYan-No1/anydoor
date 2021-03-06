const http = require('http');
const conf = require('./config/defaultConfig');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(conf.root, url);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-type', 'text/plain');
      res.end(`${filePath} is not a directory or file`);
      return
    }
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(files.join(','))
      })
    }
  })
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
