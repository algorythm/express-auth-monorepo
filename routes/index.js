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

    let items = [];
    let { token_type, access_token } = req.oidc.accessToken;
    console.log('extracted token stuff');


    console.log('token type:', token_type);
    console.log('access token:', access_token);

    try {
        const apiResponse = await axios.get('http://localhost:3001/items', {
            headers: {
                authorization: `Bearer ${access_token}`,
            }
        });
        items = apiResponse.data;
    } catch {
        console.error('ERROR: failed to fetch items from server');
    }
    res.render('items', {
        title: 'Items',
        isAuthenticated,
        user: req.oidc.user,
        items,
    });
});

module.exports = router;
