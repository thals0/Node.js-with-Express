// @ts-check

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.cookie('alert', true, {
  //   // 1000 = 1s
  //   expires: new Date(Date.now() + 1000 * 10),
  //   // 통신이 일어날 때만 볼 수 있음, 브라우저에서 console.log찍어도 볼 수 없음(보안상 중요)
  //   httpOnly: true,
  // });
  // console.log(req.cookies.popup);
  res.render('index', { popup: req.cookies.popup });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
  });
  res.send('쿠키 생성');
});

module.exports = router;
