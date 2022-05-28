const express = require('express');
const router = express.Router();

let defaultName = 'World';

router.get('/', (req, res) => {
    // const user = req.oidc.user;
    const isAuthenticated = req.oidc.isAuthenticated();
    let { name } = req.query;
    if (!name) {
        name = defaultName;
    }
    res.render('index', {
        title: 'My Express App',
        name,
        isAuthenticated,
    });
});

module.exports = router;
