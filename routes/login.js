// @ts-check

const express = require('express');

const router = express.Router();
const passport = require('passport');
// const mongoClient = require('./mongo');

const isLogin = (req, res, next) => {
  // session or passport or cookies 중 하나의 정보라도 있으면
  if (req.session.login || req.user || req.signedCookies.user) {
    next();
  } else {
    res.redirect('./login');
  }
};

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send(
        `${info.message} <br><a href="/register">회원가입 페이지로 이동</a>`
      );
    }
    req.logIn(user, (err) => {
      if (err) throw err;
      res.cookie('user', req.body.id, {
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        signed: true,
      });
      res.redirect('/board');
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    return res.redirect('/');
  });
  // session으로 logOut
  // req.session.destroy((err) => {
  //   if (err) throw err;
  //   res.redirect('/');
  // });
});

router.get('/auth/naver', passport.authenticate('naver'));

router.get(
  '/auth/naver/callback',
  passport.authenticate('naver', {
    // 로그인 성공시 board로 실패시 메인화면으로
    successRedirect: '/board',
    failureRedirect: '/',
  })
);
module.exports = { router, isLogin };
