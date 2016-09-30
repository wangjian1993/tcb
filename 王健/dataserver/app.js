var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





//console.log("您当前的页码是：" + req.params.count);
//console.log(bufferData[count].toJSON());
//  res.set("Content-Type","application/json");
module.exports = app;
var express = require('express');
var fs = require('fs');

var app =  express();
var bufferData = [];
fs.readFile("data/1.json",function(err,data){
  bufferData.push(data);
});
fs.readFile("data/2.json",function(err,data){
  bufferData.push(data);
});
fs.readFile("data/3.json",function(err,data){
  bufferData.push(data);
  app.listen(5500);
  console.log("服务已经启动了");
});

//设置跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get('/tcb/shops/pagecount/:count',function(req,res,next) {
  /* res.set("Content-Type","application/json");*/
  var count = req.params.count - 1;
  res.send(bufferData[count]);
});
