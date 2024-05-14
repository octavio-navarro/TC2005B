/*
 * Simple JavaScript / Express server to return strings in JSON format
 *
 * Gilberto Echeverria
 * 2024-05-13
 */

const express = require('express')

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send("This is the ROOT of the server");
});

app.get('/buttons', (req, res) => {
    const buttons = {
        buttons: [
            {
                id: 0,
                r: 0.0,
                g: 1.0,
                b: 1.0
            },
            {
                id: 1,
                r: 1.0,
                g: 0.0,
                b: 1.0
            },
            {
                id: 2,
                r: 1.0,
                g: 1.0,
                b: 0.0
            },
            {
                id: 3,
                r: 0.0,
                g: 0.0,
                b: 0.0
            }
        ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(buttons);
});

app.post('/test', (req, res) => {
    console.log(`Received post with params: ${req.params}`);
    res.status(200).send(`Post request successful`);
});

app.listen(PORT, (error) => {
    if(!error)
        console.log(`App listening on: http://localhost:${PORT}`);
    else
        console.log(`Error ocurred, server can't start: ${error}`);
});
