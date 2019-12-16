const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        req.user = jwt.verify(token, 'secret');
        next();
    } catch (e) {
        res.status(401).json({msg: 'Unauthorized'});
    }
};