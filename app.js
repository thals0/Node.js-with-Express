// @ts-check

const express = require('express');

// const bodyParser = require('body-parser');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const PORT = process.env.PORT;

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie-parser
app.use(cookieParser('bay'));
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

// passport
app.use(passport.initialize());
app.use(passport.session());

const mainRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const passportRouter = require('./routes/passport');
const chatRouter = require('./routes/chat');

passportRouter();

app.use('/', mainRouter);
// app.use('/users', usersRouter);
// app.use('/posts', postsRouter);
app.use('/board', boardRouter);
app.use('/register', registerRouter.router);
app.use('/login', loginRouter.router);
app.use('/chat', chatRouter);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 변수 순서 주의!
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The Express Server is reunning at ${PORT}`);
});
