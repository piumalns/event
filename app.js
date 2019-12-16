const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./db/connect');
const user = require('./routes/user');
const event = require('./routes/event');

database.connect();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/user', user);
app.use('/event', event);
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(function (err, req, res, next) {
    res.status(500).json({msg: 'Server fault'});
});
app.listen(port, () => {
    console.log('Server started on port ' + port);
});