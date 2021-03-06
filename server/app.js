const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
// const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const weatherRouter = require('./routes/weather');
const diaryRouter = require('./routes/diary')
const newsRouter = require('./routes/news')

const app = express();

//跨域设置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://47.93.45.54:7070'); //设置允许访问的来源
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS,PUT"); //设置允许访问的请求方式
  res.header("Access-Control-Allow-Credentials", true); //允许请求中携带Cookie
  // res.header("Cache-Control","no-cache")
  next();
})
// app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views')); //__dirname 总是指向被执行 js 文件的绝对路径
app.set('view engine', 'ejs');
// app.engine('html',ejs.__express); //设置视图为html引擎，ejs在页面仍然可用
// app.set('view engine', 'html');//设置视图为html引擎，ejs在页面仍然可用

//登录拦截
// app.use(function (req, res, next) {
//   console.log(req.sessionID)
//   if (!req.sessionID) {
//     res.json({
//       status: '1',
//       msg: '请您登录以后再进行操作'
//     })
//   } else if (req.sessionID) {
//     next();
//   }
// })

// 使用bodyparder中间件，
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 使用 session 中间件
app.use(session({
  name: 'key_id',
  secret: 'secret', // 对session_id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    httpOnly: true,
  },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(cookieParser('this is the secret key for singed cookie'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/weather', weatherRouter);
app.use('/diary', diaryRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;