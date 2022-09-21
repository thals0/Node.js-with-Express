const express = require('express');

const router = express.Router();

const WebSocketServer = require('ws').Server;

// web socket server
const wss = new WebSocketServer({ port: 7777 });

// 연결이 발생하면 익명함수 실행
wss.on('connection', (ws) => {
  wss.clients.forEach((clients) => {
    clients.send(
      `새로운 유저가 참가 했습니다. 현재 유저 수: ${wss.clients.size}`
    );
  });

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(message.toString());
      // client.send(`${message}`);
    });
  });

  ws.on('close', () => {
    wss.clients.forEach((client) => {
      client.send(
        `유저 한 명이 나갔습니다. 현재 유저 수 : ${wss.clients.size}`
      );
    });
  });

  // ws.send('저는 서버입니다.');

  // ws.on('message', (message) => {
  //   console.log(message.toString());
  // });
});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
