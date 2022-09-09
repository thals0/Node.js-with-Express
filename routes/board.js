// @ts-check

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.resnder('board');
});
