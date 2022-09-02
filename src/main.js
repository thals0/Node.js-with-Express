// @ts-check

const express = require('express');

const app = express();

const PORT = 4000;

app.use('/', (req, res, next) => {
  console.log('middleware 1st');
  next();
  // res.send('Hello, Express World!');
  // res.end() -> 404일때
});
app.use('/', (req, res, next) => {
  console.log('middleware 2nd');
  next();
});

app.use('/', (req, res) => {
  console.log('middleware 3rd');
  res.send('통신 종료');
});

app.listen(PORT, () => {
  console.log(`The Express Server is reunning at ${PORT}`);
});
