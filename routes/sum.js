const express = require('express');
const db = require('../src/database');
const config = require('../src/config');

const Request = require('request');
const router = express.Router();


router.get('/:id', getItem);
router.get('/', getAll);

function getItem(req, res) {
    let item = db.sumCollection.findOne({id: parseInt(req.params.id)});
    res.json(item);
}

function getAll(req, res) {
    res.json(db.sumCollection.find())
}

setTimeout(pollQueue, config.WORKER_TIMEOUT);

function pollQueue() {
    setTimeout(pollQueue, config.WORKER_TIMEOUT);

    Request.get({
        url: 'http://127.0.0.1:3000/queue',
        json: true
    }, queueResponse);

    function queueResponse(err, resp, body) {
        if(resp.statusCode === 204) {
            return;
        }

        let item = db.sumCollection.findOne({id: parseInt(body.id)});
        if(item === null) {
            db.sumCollection.insert({
                id: body.id,
                sum: body.number
            })
        } else {
            item.sum += body.number;
            db.sumCollection.update(item);
        }
    }
}

module.exports = router;
