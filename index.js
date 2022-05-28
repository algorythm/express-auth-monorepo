const express = require('express');
const app = express();

const port = 3000;

app.get('/', (_, res) => {
    res.status(200).send({message: "Hello, World!"});
});

app.listen(port, () => console.info(`Listening on http://localhost:${port}`));
