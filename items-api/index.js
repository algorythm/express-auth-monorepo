const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

require('dotenv').config();

const port = process.env.APIPORT;

const items = [
    {
        "id": "d4ca78ff-553a-4ee3-be1f-ece1b057a76f",
        "name": "this is an item from a remote server"
    },
    {
        "id": "c2e4d6d8-6bf3-4239-b3b9-07e8e2e80d63",
        "name": "i hope no unauthorized people can see this"
    }
];

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.OIDC_WELLKNOWN,
    }),
    audience: process.env.OIDC_AUDIENCE,
    issuer: process.env.OIDC_ISSUER,
    algorithms: ['RS256']
});
app.use(jwtCheck);
app.use(express.json());

app.post('/items', (req, res) => {
    const itemToCreate = {
        id: uuidv4(),
        name: req.body.name,
    };
    items.push(itemToCreate);
    res.status(201).json(itemToCreate);
});

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
        items.splice(itemIndex, 1);
    }

    res.status(204).send();
});

app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id === itemId);

    if (!item) {
        res.status(404).json({error: `could not find item with id ${itemId}`});
    } else {
        res.status(200).json(item);
    }
})

app.get('/items', (req, res) => {
    res.json(items);
});

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});
