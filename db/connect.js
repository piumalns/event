const mysql = require('mysql');
const database = require('../config/database');
const queries = require('./queries');

const connection = mysql.createConnection(database.data);

module.exports.connect = function () {
    connection.connect(function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Connected to database');
            createTable(queries.tables.UserTable);
            createTable(queries.tables.EventTable);
            createTable(queries.tables.UserEventTable);
        }
        connection.end();
    });
};

function createTable(sql) {
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
        }
    });
}