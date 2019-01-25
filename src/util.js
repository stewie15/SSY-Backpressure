// retourniert eine Zahl zwischen 1-max (inklusiv)
function randomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

let timestamps = [];

// how many requests per second are allowed
function tooManyRequests(limit) {
    let now = Date.now();
    timestamps = timestamps.filter((x) => x > now - 1000);
    timestamps.push(now);
    return (timestamps.length >= limit);
}


module.exports = {
    randomId: randomInt,
    tooManyRequests: tooManyRequests
};
