// @ts-check

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 4000;

const userRouter = express.Router();

app.use('/users', userRouter);

const USER = [
  {
    id: 'bay',
    name: 'thals',
    email: 'thals0107@naver.com',
  },
  {
    id: 'test',
    name: 'xptmxm',
    email: 'test@gamil.com',
  },
];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('views'));

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

// app.get('/:id/:name/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

// app.get('/:email/:pw/:name/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   // console.log(req.query.title);
//   // console.log(req.query.content);
//   console.log(req.query);
//   // 예외처리
//   const q = req.query;
//   if (q.email && q.pw && q.name && q.gender) {
//     res.send(req.query);
//   } else {
//     res.send('Unexpected query');
//   }
// });

app.listen(PORT, () => {
  console.log(`The Express Server is reunning at ${PORT}`);
});

userRouter.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('index', { USER, userCounts: userLen });
  // res.send(USER);
  // res.write('<h1>Hello, Dynamic Web page</h1>');
  // for (let i = 0; i < USER.length; i++) {
  //   res.write(`<h2>USER ID는 ${USER[i].id} </h2>`);
  //   res.write(`<h2>USER NAME는 ${USER[i].name} </h2>`);
  // }
});

userRouter.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    res.end('ID not found');
  }
});

userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료');
  } else {
    res.end('잘못된 쿼리 입니다.');
  }
});

// 실습 내가 짠 코드
// userRouter.put('/:id', (req, res) => {
//   const arrIndex = USER.findIndex((user) => user.id === req.params.id);
//   if (USER[arrIndex].id) {
//     USER[arrIndex] = {
//       id: req.query.id,
//       name: req.query.name,
//     };
//     res.send('회원 수정 완료');
//   } else {
//     res.end('잘못된 쿼리 입니다.');
//   }
// });

userRouter.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원 수정 완료');
    } else {
      res.end('해당 ID를 가진 회원이 없습니다.');
    }
  } else {
    res.end('부적절한 쿼리 입니다.');
  }
});

// 실습 내가 짠 코드
// userRouter.delete('/:id', (req, res) => {
//   const arrIndex = USER.findIndex((user) => user.id === req.params.id);
//   if (req.params.id === USER[arrIndex].id) {
//     delete USER[arrIndex];
//     res.send('회원 삭제');
//   } else {
//     res.end('잘못된 쿼리 입니다.');
//   }
// });

userRouter.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    res.end('해당 ID를 가진 회원이 없습니다.');
  }
});
