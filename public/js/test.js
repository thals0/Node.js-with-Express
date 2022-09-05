// @ts-check;
// console.log('test');

// const arr = [1, 2, 3, 4, 5, 6];
// console.log(arr);
// console.log(...arr);

// const sominData = {
//   name: '이소민',
//   gender: 'm',
// };

// const sominInfo = {
//   nickName: 'bay',
//   email: 'thals0107@naver.com',
// };

// const somin = {
//   ...sominData,
//   sominInfo,
// };

// console.log(somin);

// 구조분해할당 문법

// const sominData = {
//   name: '이소민',
//   gender: 'm',
//   nickName: 'bay',
//   email: 'thals0107@naver.com',
// };
// const { name, gender, nickName, email } = sominData;
// console.log(name, gender, nickName, email);
// const { name, ...rest } = sominData;
// console.log(name, rest);

// const arr = [1, 2, 3, 4, 5, 6];
// const [first, second, third, fourth, fifth, sixth] = arr;

// const [first, second, ...rest] = [1, 2, 3, 4, 5, 6];
// console.log(first, second, rest);

// function spread(first, ...rest) {
//   console.log(first);
//   console.log(rest);
// }
// spread(1, 2, 3, 4, 5, 6, 7);

// console.log('디렉토리 위치', __dirname);
// console.log('파일 위치와 파일명', __filename);

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
