// @ts-check

const express = require('express');

const app = express();

const PORT = 4000;

const users = require('./routes/users');
const posts = require('./routes/posts');

app.use('/users', users);
app.use('/posts', posts);

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
