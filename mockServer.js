//mockServer端用于启动mock接口


const jsonServer = require('json-server');
const server = jsonServer.create();

const routes = require('./routes.js');
const middleware = jsonServer.defaults();
server.use(middleware);

// 支持加载多个db json文件
const _ = require('underscore');
const path = require('path');
const fs = require('fs');
const mockDir = path.join(__dirname, '/mock');
const base = {};
const files = fs.readdirSync(mockDir);
files.forEach(function (file) {
  _.extend(base, require(path.resolve(mockDir, file)))
});

//使用routes文件配置
const rewriter = jsonServer.rewriter(routes);
const router = jsonServer.router(base);
var Mock = require('mockjs');

// 处理登录逻辑
server.post('/users/register', function (req, res) {
	const data=Mock.mock({
    "error": 0,
    "message": "success",
    "result|40":{
	"host":"127.0.0.1","id":"0","StartTime":"2016-12-20","Topics":12,"Partitions":3}
  });
  res.send(data);
});
server.post('/login', function (req, res, next) {
    //res.header('Access-Control-Expose-Headers', 'access-token');
	 console.log("request params: ", req.params);
    console.log("request query: ", req.query);
    console.log("request body: ", req.body);
	console.log(next);
    const {account, password} = req.query;
    if (account === 'admin' && password === '123456') {
        res.header('access-token', Date.now());
        res.json(true);
    } else {
        res.json(false);
    }
});

// 将 POST 请求转为 GET
server.use((request, res, next) => {
  request.method = 'GET';
  next();
});

server.use(rewriter);
server.use(router);

// 返回自定义格式数据
//router.render = (req, res) => {
//  console.log(res.locals.data)
//  res.jsonp({
//    data: res.locals.data,
//    status: 0,
//    msg: ''
//  })
//}

server.use((req, res, next) => {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
});


 
//mock服务监听9090端口
server.listen(9090, () => {
  console.log('JSON Server is running')
});