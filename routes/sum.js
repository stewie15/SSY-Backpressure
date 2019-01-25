const express = require('express');
const db = require('../src/database');
const Request = require('request');
const router = express.Router();


router.get('/:id', getItem);
router.get('/', getAll);

function getItem(req, res) {

}

function getAll(req, res) {

}


module.exports = router;
