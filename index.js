const express = require('express');
const indexRouter = require('./routes/index.js');
const app = express();

const { auth } = require('express-openid-connect');
require('dotenv').config();

const port = process.env.PORT;
const oidcConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.OIDC_SECRET,
    baseURL: process.env.OIDC_BASEURL,
    clientID: process.env.OIDC_CLIENTID,
    clientSecret: process.env.OIDC_CLIENTSECRET,
    issuerBaseURL: process.env.OIDC_ISSUER,
    authorizationParams: {
        response_type: "code",
        audience: "http://localhost:3001",
        scope: "openid profile email"
    }
};
app.use(auth(oidcConfig));

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});
