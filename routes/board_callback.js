// @ts-check

const express = require('express');

const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://Somin:dlthals17@cluster0.kbk9mgh.mongodb.net/?retryWrites=true&w=majority';

router.get('/', async (req, res) => {
  // 글 전체 목록 보여주기
  MongoClient.connect(uri, (err, db) => {
    const data = db.db('node1').collection('board');

    data.find({}).toArray((err, result) => {
      const ARTICLE = result;
      const articleLen = ARTICLE.length;
      res.render('board', { ARTICLE, articleCounts: articleLen });
    });
  });
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
    MongoClient.connect(uri, (err, db) => {
      const data = db.db('node1').collection('board');

      data.insertOne(newArticle, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.redirect('/board');
        }
      });
    });
  } else {
    const err = new Error('데이터가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/edit/title/:title', (req, res) => {
  // 글 수정 모드로 이동
  MongoClient.connect(uri, (err, db) => {
    const data = db.db('node1').collection('board');
    data.findOne({ title: req.params.title }, (err, result) => {
      if (err) {
        throw err;
      } else {
        const selectedArticle = result;
        res.render('board_edit', { selectedArticle });
      }
    });
  });
});

router.post('/edit/title/:title', (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    MongoClient.connect(uri, (err, db) => {
      const data = db.db('node1').collection('board');
      data.updateOne(
        { title: req.params.title },
        { $set: { title: req.body.title, content: req.body.content } },
        (err, result) => {
          if (err) {
            throw err;
          } else {
            res.redirect('/board');
          }
        }
      );
    });
  } else {
    const err = new Error('요청 값이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/delete/title/:title', (req, res) => {
  // 글 삭제 기능 수행
  MongoClient.connect(uri, (err, db) => {
    const data = db.db('node1').collection('board');
    data.deleteOne({ title: req.params.title }, (err, result) => {
      if (err) {
        res.end('해당 데이터가 없습니다.');
        throw err;
      } else {
        res.send('삭제 완료');
      }
    });
  });
});

module.exports = router;
