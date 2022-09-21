// @ts-check

const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const mongoClient = require('./mongo');

const createHashedPassword = (password) => {
  const salt = crypto.randomBytes(64).toString('base64');
  // console.log('salt', salt);
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  return { hashedPassword, salt };
};

const verifyPassword = (password, salt, userPassword) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  // console.log(hashed);
  // console.log(userPassword);
  // hashed와 userPassword 같은지 비교
  if (hashed === userPassword) return true;
  return false;
};

router.get('/', (req, res) => {
  // const userPW = createHashedPassword('1234');
  // console.log(verifyPassword('1234', salt, userPW));
  res.render('register');
});
// 로그인은 무조건 post로 get으로 하면 url에 아이디, 비번 보임
router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('node1').collection('users');
  const duplicated = await userCursor.findOne({ id: req.body.id });

  const pwResult = createHashedPassword(req.body.password);
  // hpwResult는 객체를 반납
  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      name: req.body.id,
      password: pwResult.hashedPassword,
      salt: pwResult.salt,
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

module.exports = { router, verifyPassword };
