const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const items = [
    {
        "id": "d4ca78ff-553a-4ee3-be1f-ece1b057a76f",
        "name": "this is an item"
    },
    {
        "id": "c2e4d6d8-6bf3-4239-b3b9-07e8e2e80d63",
        "name": "i hope no unauthorized people can see this"
    }
];

router.get('/', (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();
    res.render('index', {
        title: 'My Express App',
        isAuthenticated,
        user: req.oidc.user,
    });
});

router.get('/items', requiresAuth(), (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();
    res.render('items', {
        title: 'Items',
        isAuthenticated,
        user: req.oidc.user,
        items,
    });
});

module.exports = router;
