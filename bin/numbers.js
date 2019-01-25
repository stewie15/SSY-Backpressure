const Request = require('request');
const config = require('../src/config');
const util = require('../src/util');

sendMessage(1);

function sendMessage(number) {
    setTimeout(sendMessage, config.CLIENT_TIMEOUT, number + 1);

    Request.post({
        url: 'http://127.0.0.1:3000/queue',
        json: {
            id: util.randomId(10),
            number: number
        }
    }, response);

    function response(error, response, body) {
        console.log("Message: " + number + ", Status: " + response.statusCode);
    }
}