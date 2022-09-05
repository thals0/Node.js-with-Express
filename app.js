// @ts-check

const express = require('express');

const app = express();

const PORT = 4000;

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`The Express Server is reunning at ${PORT}`);
});
