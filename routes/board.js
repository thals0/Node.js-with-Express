// @ts-check

const express = require('express');

const router = express.Router();

const BOARD = [
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
  const boardLen = BOARD.length;
  res.render('board', { BOARD, boardCounts: boardLen });
});

router.get('/write', (req, res) => {
  res.render('board_write');
});

router.get('/edit/:title', (req, res) => {
  const boardData = BOARD.find((board) => board.title === req.params.title);
  if (boardData) {
    const arrIndex = BOARD.findIndex((post) => post.title === req.params.title);
    res.render('board_edit', { BOARD, i: arrIndex });
  } else {
    res.end('Not found');
  }
});

router.delete('/:title', (req, res) => {
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  if (arrIndex !== -1) {
    BOARD.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('Not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
