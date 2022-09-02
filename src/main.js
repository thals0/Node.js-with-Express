// @ts-check

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 4000;

// app.use('/', async (req, res, next) => {
//   console.log('middleware 1st');
//   req.reqTime = new Date();
//   req.fileContent = await fs.promises.readFile('package.json', 'utf-8');
//   next();
//   // res.send('Hello, Express World!');
//   // res.end() -> 404일때
// });
// app.use((req, res, next) => {
//   // console.log('middleware 2nd');
//   console.log(req.reqTime);
//   console.log(req.fileContent);
//   next();
// });

// app.use((req, res) => {
//   console.log('middleware 3rd');
//   res.send('통신 종료');
// });

// app.get('/:id', (req, res) => {
//   console.log(req.params);
//   res.send(`id는 ${req.params.id}`);
// });

app.get('/:id/:name/:gender', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

// app.get('/:email/:pw/:name/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

app.get('/', (req, res) => {
  // console.log(req.query.title);
  // console.log(req.query.content);
  console.log(req.query);
  // 예외처리
  const q = req.query;
  if (q.email && q.pw && q.name && q.gender) {
    res.send(req.query);
  } else {
    res.send('Unexpected query');
  }
});

app.listen(PORT, () => {
  console.log(`The Express Server is reunning at ${PORT}`);
});

const userRouter = express.Router();
const postsRouter = express.Router();

app.use('/user', userRouter);
app.use('/posts', postsRouter);

userRouter.get('/', (req, res) => {
  res.send('회원 목록');
});
userRouter.post('/:name', (req, res) => {
  res.send(`이름이 ${req.params.name}인 유저가 등록 되었습니다. `);
});
postsRouter.get('/', (req, res) => {
  res.send('블로그 글 목록');
});
postsRouter.post('/:name', (req, res) => {
  res.send(`제목이 ${req.params.name}인 글이 등록 되었습니다. `);
});
