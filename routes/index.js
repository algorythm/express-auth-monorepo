const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();

    if(!!req.oidc.user) {
        console.log(JSON.stringify(req.oidc.user));
    }

    res.render('index', {
        title: 'My Express App',
        isAuthenticated,
        user: req.oidc.user
    });
});

module.exports = router;
