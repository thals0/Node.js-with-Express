// @ts-check

const express = require('express');

// const bodyParser = require('body-parser');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'thals',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

const mainRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/board', boardRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

// 변수 순서 주의!
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The Express Server is reunning at ${PORT}`);
});
