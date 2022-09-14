// @ts-check

const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'test1',
    content: 'test1',
  },
  {
    title: 'test2',
    content: 'test2',
  },
  {
    title: 'test3',
    content: 'test3',
  },
];

router.get('/', (req, res) => {
  // 글 전체 목록 보여주기
  const articleLen = ARTICLE.length;
  res.render('board', { ARTICLE, articleCounts: articleLen });
  // res.write('<h1>Welcome</h1>');
});

router.get('/write', (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('board_write');
});

router.post('/write', (req, res) => {
  // 글 추가 기능 수행
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('데이터가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/edit/title/:title', (req, res) => {
  // 글 수정 모드로 이동
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_edit', { selectedArticle });
});

router.post('/edit/title/:title', (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('요청 값이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/delete/title/:title', (req, res) => {
  // 글 삭제 기능 수행
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  if (arrIndex !== -1) {
    ARTICLE.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

// router.get('/edit/:title', (req, res) => {
//   const boardData = ARTICLE.find((board) => board.title === req.params.title);
//   if (boardData) {
//     const arrIndex = ARTICLE.findIndex(
//       (post) => post.title === req.params.title
//     );
//     res.render('board_edit', { BOARD, i: arrIndex });
//   } else {
//     res.end('Not found');
//   }
// });

// router.delete('/:title', (req, res) => {
//   const arrIndex = ARTICLE.findIndex(
//     (board) => board.title === req.params.title
//   );
//   if (arrIndex !== -1) {
//     ARTICLE.splice(arrIndex, 1);
//     res.send('글 삭제 완료');
//   } else {
//     const err = new Error('Not found');
//     err.statusCode = 404;
//     throw err;
//   }
// });

module.exports = router;
