const express = require('express');
const router = express.Router();
const models = require('../controllers/user');
const validator = require('../db/validator');
const auth = require('../middleware/auth');

router.post('/register', function (req, res, next) {
    let errorList = validator.validateRegistration(req.body);
    if (Object.keys(errorList).length !== 0) {
        res.status(422).json({'errors': errorList});
    } else {
        models.registerUser(req.body, function (status, msg) {
            res.status(status).json({msg: msg});
        });
    }
});

router.post('/login', function (req, res, next) {
    let errorList = validator.validateLogin(req.body);
    if (Object.keys(errorList).length !== 0) {
        res.status(422).json({'errors': errorList});
    } else {
        models.loginUser(req.body, function (status, msg) {
            if (status === 200) {
                res.status(status).json(msg);
            } else {
                res.status(status).json({msg: msg});
            }
        });
    }
});

router.get('/profile', auth, function (req, res, next) {
    models.profile(req.user.name, function (status, msg) {
        if (status === 200) {
            res.status(status).json({profile: msg});
        } else {
            res.status(status).json({msg: msg});
        }
    })
});

module.exports = router;