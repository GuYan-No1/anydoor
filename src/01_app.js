const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  res.statusCode = 200;//响应状态码
  res.setHeader('Content-Type', 'text/plain');//设置响应头
  res.end('hello http~');
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);

});
