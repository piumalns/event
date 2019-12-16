const mysql = require('mysql');
const connectionConfig = require('../config/database');
const database = require('../db/queries');
const connection = mysql.createConnection(connectionConfig.data);

module.exports.registerForEvent = function (userId, eventId, callback) {
    let values = [userId, eventId];
    connection.query(database.event.InsertUserEventQuery, [[values]], function (error, result, fields) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                callback(422, {msg: "User already registered for the event"})
            } else {
                callback(500, { msg: "Database error" });
            }

        } else {
            callback(200, { msg: "Registered for the event" });
        }
    });
};

module.exports.getUserEvents = function (userId, callback) {
    let values = [userId];
    connection.query(database.event.GetUserEventQuery, [[values]], function (error, result, fields) {
        if (error) {
            callback(500, { msg: "Database error" });
        } else {
            callback(200, { events: result });
        }
    });
};

module.exports.getAllEvents = function (callback) {
    connection.query(database.event.GetAllEvents, null, function (error, result, fields) {
        if (error) {
            callback(500, "Database error");
        } else {
            callback(200, { events: result });
        }
    });
};

module.exports.getEventUsers = function (eventId, callback) {
    let values = [eventId];
    connection.query(database.event.GetEventUsers, [[values]], function (error, result, fields) {
        if (error) {
            callback(500, { msg: "Database error" });
        } else {
            result.forEach(function (item, index) {
                delete item.password;
            });
            callback(200, result);
        }
    });
};


module.exports.createEvent = function (name, location, callback) {
    let values = [name, location];
    connection.query(database.event.CreateEvent, [[values]], function (error, result, fields) {
        if (error) {
            console.log(error)
            callback(500, { msg: "Database error" });
        } else {
            callback(201, { msg: 'Event created successfully' });
        }
    });
};