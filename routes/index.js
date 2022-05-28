const express = require('express');
const router = express.Router();

let defaultName = 'World';

router.get('/', (req, res) => {
    let { name } = req.query;
    if (!name) {
        name = defaultName;
    }
    res.render('index', { title: 'My Express App', name });
});

module.exports = router;