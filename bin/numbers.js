const Request = require('request');
const config = require('../src/config');
const util = require('../src/util');

sendMessage(1);

function sendMessage(number) {
    setTimeout(sendMessage, config.CLIENT_TIMEOUT, number + 1);

    sendToQueue(util.randomId(10), number, 0);
}

function sendToQueue(id, number, retry_count) {

    if(retry_count < 3) {
        Request.post({
            url: 'http://127.0.0.1:3000/queue',
            json: {
                id: id,
                number: number
            }
        }, response);
    } else {
        console.log('Giving up on ' + number);
    }



    function response(error, response, body) {
        console.log("Message: " + number + ", Status: " + response.statusCode);
        if(response.statusCode === 429) {
            setTimeout(
                sendToQueue,
                config.CLIENT_TIMEOUT * 2,
                id, number, retry_count+1);
        }
    }
}