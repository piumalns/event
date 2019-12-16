const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const validator = require('../db/validator');
const auth = require('../middleware/auth');

// user, admin
router.post('/register', auth, function (req, res, next) {
    let errorList = validator.validateEventRegistration(req.body);
    if (Object.keys(errorList).length !== 0) {
        res.status(422).json({ errors: errorList });
    } else {
        eventController.registerForEvent(req.user.id, req.body.event_id, function (status, msg) {
            res.status(status).json(msg);
        });
    }
});

// user, admin
router.get('/upcoming', auth, function (req, res, next) {
    eventController.getUserEvents(req.user.id, function (status, result) {
        res.status(status).json(result);
    });
});

// user, admin
router.get('/all', auth, function (req, res, next) {
    eventController.getAllEvents(function (status, result) {
        if (status === 200) {
            res.status(status).json(result);
        } else {
            res.status(status).json({ msg: result });
        }
    });
});

// admin only
router.post('/users', auth, function (req, res, next) {
    if (req.user.name !== 'admin') {
        res.status(401).json({ msg: 'Unauthorized' });
    } else {
        let errorList = validator.validateEventUser(req.body);
        if (Object.keys(errorList).length !== 0) {
            res.status(422).json({ errors: errorList });
        } else {
            eventController.getEventUsers(req.body.event_id, function (status, result) {
                res.status(status).json(result);
            });
        }
    }
});

router.post('/create', auth, function (req, res, next){
    if (req.user.name !== 'admin') {
        res.status(401).json({ msg: 'Unauthorized' });
    } else {
        let errorList = validator.validateCreateEvent(req.body);
        if (Object.keys(errorList).length !== 0) {
            res.status(422).json({ errors: errorList });
        } else {
            eventController.createEvent(req.body.name, req.body.location, function (status, result) {
                res.status(status).json(result);
            });
        }
    }
});

module.exports = router;