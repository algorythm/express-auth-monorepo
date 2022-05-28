const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');

router.get('/', (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();
    res.render('index', {
        title: 'My Express App',
        isAuthenticated,
        user: req.oidc.user,
    });
});

router.get('/items', requiresAuth(), async (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();

    const apiResponse = await axios.get('http://localhost:3001/items');
    const items = apiResponse.data;
    res.render('items', {
        title: 'Items',
        isAuthenticated,
        user: req.oidc.user,
        items,
    });
});

module.exports = router;
