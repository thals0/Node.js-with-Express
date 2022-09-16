// @ts-check

const express = require('express');

const router = express.Router();
const mongoClient = require('./mongo');

router.get('/', (req, res) => {
  res.render('register');
});
// 로그인은 무조건 post로 get으로 하면 url에 아이디, 비번 보임
router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('node1').collection('users');
  const duplicated = await userCursor.findOne({ id: req.body.id });

  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      password: req.body.password,
    });
    if (result.acknowledged) {
      res.status(200);
      res.send('회원 가입 성공!<br><a href="/login">로그인 페이지로 이동</a>');
    } else {
      res.status(500);
      res.send(
        '회원 가입 문제 발생!<br><a href="/register">회원가입 페이지로 이동</a>'
      );
    }
  } else {
    res.status(300);
    res.send(
      '중복된 id 가 존재합니다.<br><a href="/register">회원가입 페이지로 이동</a>'
    );
  }
});

module.exports = router;
