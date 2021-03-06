const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  res.statusCode = 200;//响应状态码
  res.setHeader('Content-Type', 'text/html');//设置响应头
  res.write('<html>');
  res.write('<body>');
  res.write('<h1 style="color:yellow">');
  res.write('hello http~~');
  res.write('</h1>');
  res.write('</body>');
  res.end('</html>');
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
