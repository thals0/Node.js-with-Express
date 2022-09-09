// @ts-check

const express = require('express');

// const bodyParser = require('body-parser');

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/board', boardRouter);

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
