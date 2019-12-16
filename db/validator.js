const validator = require('validator').default;

module.exports.validateRegistration = function (user) {
    const name = user.name;
    const email = user.email;
    const password = user.password;
    let errorList = {};
    if (name === undefined) {
        errorList.name = 'Name is required';
    } else if (validator.isEmpty(name, { ignore_whitespace: true })) {
        errorList.name = 'Name can\' be empty';
    }
    if (email === undefined) {
        errorList.email = "Email is required";
    } else if (validator.isEmpty(email, { ignore_whitespace: true })) {
        errorList.email = "Email can't be empty";
    } else if (!validator.isEmail(email)) {
        errorList.email = "Email is not valid";
    }
    if (password === undefined) {
        errorList.password = 'Password is required';
    } else if (validator.isEmpty(password, { ignore_whitespace: true })) {
        errorList.password = 'Password can\' be empty';
    }
    return errorList;
};

module.exports.validateLogin = function (credentials) {
    const name = credentials.name;
    const password = credentials.password;
    console.log(credentials);
    let errorList = {};
    if (!name) {
        errorList.name = "Name is required";
    } else if (validator.isEmpty(name, { ignore_whitespace: true })) {
        errorList.name = "Name can't be empty";
    }
    if (!password) {
        errorList.password = "Password is required";
    } else if (validator.isEmpty(password, { ignore_whitespace: true })) {
        errorList.password = "Password can't be empty";
    }
    return errorList;
};

module.exports.validateEventRegistration = function (reqBody) {
    const eventId = reqBody.event_id;
    let errorList = {};
    if (!eventId) {
        errorList.event_id = "event_id is required";
    } else if (validator.isEmpty(eventId, { ignore_whitespace: true })) {
        errorList.event_id = "event_id can't be empty";
    }
    return errorList;
};

module.exports.validateEventUser = function (reqBody) {
    const eventId = reqBody.event_id;
    let errorList = {};
    if (!eventId) {
        errorList.event_id = "event_id is required";
    } else if (validator.isEmpty(eventId, { ignore_whitespace: true })) {
        errorList.event_id = "event_id can't be empty";
    }
    return errorList;
};

module.exports.validateCreateEvent = function (reqBody) {
    const name = reqBody.name;
    const location = reqBody.location;
    let errorList = {};
    if (!name) {
        errorList.name = "name is required";
    } else if (validator.isEmpty(name, { ignore_whitespace: true })) {
        errorList.name = "name can't be empty";
    }
    if (!location) {
        errorList.location = "location is required";
    } else if (validator.isEmpty(location, { ignore_whitespace: true })) {
        errorList.location = "location can't be empty";
    }
    return errorList;
};