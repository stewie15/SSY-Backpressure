const Loki = require("lokijs");

const db = new Loki('backpressure.json');
const sum = db.addCollection('sum');

module.exports = {
    database: db,
    sumCollection: sum
};