const bcrypt = require('bcrypt');
const mysql = require('mysql');
const connectionConfig = require('../config/database');
const database = require('../db/queries');
const connection = mysql.createConnection(connectionConfig.data);
const jwt = require('jsonwebtoken');

module.exports.registerUser = function (reqBody, callback) {
    let values = [];
    bcrypt.hash(reqBody.password, 10, function (err, hash) {
        if (err) {
            throw err;
        } else {
            values[0] = reqBody.name;
            values[1] = reqBody.email;
            values[2] = hash;
            connection.query(database.user.InsertUserQuery, [[values]], function (error, result, fields) {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        callback(422, "User already registered");
                    } else {
                        callback(500, "Database error");
                    }
                } else {
                    callback(201, "User registered successfully");
                }
            });
        }
    });
};

module.exports.loginUser = function (credentials, callback) {
    let values = [];
    values[0] = credentials.name;
    connection.query(database.user.GetUserByNameQuery, [[values]], function (error, result, fields) {
        if (error) throw error;
        if (result.length === 0) {
            callback(401, "Invalid username or password");
        } else {
            bcrypt.compare(credentials.password, result[0].password, function (error, matched) {
                if (error) throw error;
                if (matched) {
                    let user = {
                        'id': result[0].id,
                        'name': result[0].name,
                        'email': result[0].email
                    };
                    let token = jwt.sign(user, 'secret');
                    callback(200, {token: token, user: user});
                } else {
                    callback(401, "Invalid username or password");
                }
            });
        }
    });
};

module.exports.profile = function (name, callback) {
    let values = [name];
    connection.query(database.user.GetUserByNameQuery, [[values]], function (error, result, fields) {
        if (error) {
            callback(500, "Database error");
        } else {
            let user = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email
            };
            callback(200, user);
        }
    })
};