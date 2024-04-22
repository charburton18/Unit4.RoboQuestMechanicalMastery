const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/robo_quest');

// client.connect();
// console.log('CONNECTED TO DB');

module.exports = client;