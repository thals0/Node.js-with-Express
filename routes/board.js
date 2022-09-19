// @ts-check

const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo');

// router 이름이 겹쳐서 아래 방법은 사용 불가
// const { router, isLogin } = require('./login');

const login = require('./login');

router.get('/', login.isLogin, async (req, res) => {
  // console.log(req.user);
  // 글 전체 목록 보여주기
  const client = await mongoClient.connect();
  const cursor = client.db('node1').collection('board');
  const ARTICLE = await cursor.find({}).toArray();
  const articleLen = ARTICLE.length;
  res.render('board', {
    ARTICLE,
    articleCounts: articleLen,
    userId: req.session.userId
      ? req.session.userId
      : req.user?.id
      ? req.user?.id
      : req.signedCookies.user,
  });
});

router.get('/write', login.isLogin, (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('board_write');
});

router.post('/write', login.isLogin, async (req, res) => {
  // 글 추가 기능 수행
  if (req.body.title && req.body.content) {
    const newArticle = {
      // session으로 login한 경우가 없으면 req.user(passport) 방법으로 login한 유저.id 가져오기
      id: req.session.userId ? req.session.userId : req.user.id,
      title: req.body.title,
      content: req.body.content,
    };
    const client = await mongoClient.connect();
    const cursor = client.db('node1').collection('board');
    await cursor.insertOne(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('데이터가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/edit/title/:title', login.isLogin, async (req, res) => {
  // 글 수정 모드로 이동
  const client = await mongoClient.connect();
  const cursor = client.db('node1').collection('board');
  const selectedArticle = await cursor.findOne({ title: req.params.title });
  res.render('board_edit', { selectedArticle });
});

router.post('/edit/title/:title', login.isLogin, async (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    const client = await mongoClient.connect();
    const cursor = client.db('node1').collection('board');
    await cursor.updateOne(
      { title: req.params.title },
      { $set: { title: req.body.title, content: req.body.content } }
    );
    res.redirect('/board');
  } else {
    const err = new Error('요청 값이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/delete/title/:title', login.isLogin, async (req, res) => {
  // 글 삭제 기능 수행
  const client = await mongoClient.connect();
  const cursor = client.db('node1').collection('board');
  const result = await cursor.deleteOne({ title: req.params.title });

  // acknowledged: T or F 반환
  if (result.acknowledged) {
    res.send('삭제 완료');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
