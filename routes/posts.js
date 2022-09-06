// @ts-check

const express = require('express');

const router = express.Router();

const POST = [
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
  const postLen = POST.length;
  res.render('post', { POST, postCounts: postLen });
});

router.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (req.query.title && req.query.content) {
    const newPost = {
      title: req.query.title,
      content: req.query.content,
    };
    POST.push(newPost);
    res.send('글 추가 완료');
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POST.find((post) => post.title === req.params.title);
    if (postData) {
      const arrIndex = POST.findIndex(
        (post) => post.title === req.params.title
      );
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST[arrIndex] = modifyPost;
      res.send('회원 수정 완료');
    } else {
      const err = new Error('Not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('Not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
