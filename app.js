// @ts-check

const express = require('express');

// const bodyParser = require('body-parser');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoClient = require('./routes/mongo');

const PORT = 4000;

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie-parser
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
// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'password',
    },
    async (id, password, cb) => {
      const client = await mongoClient.connect();
      const userCursor = client.db('node1').collection('users');
      // {id : id} = {id}
      const idResult = await userCursor.findOne({ id });
      if (idResult !== null) {
        if (idResult.password === password) {
          cb(null, idResult);
        } else {
          cb(null, false, { message: '비밀번호가 틀렸습니다.' });
        }
      } else {
        cb(null, false, { message: '해당 id가 없습니다.' });
      }
    }
  )
);

// idResult -> user
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// 통신을 해야하니까 async사용
passport.deserializeUser(async (id, cb) => {
  const client = mongoClient.connect();
  const userCursor = client.db('node1').collection('users');
  const result = await userCursor.findOne({ id });
  if (result !== null) cb(null, result);
});

const mainRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter);
// app.use('/users', usersRouter);
// app.use('/posts', postsRouter);
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
