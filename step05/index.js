const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: false}))

// app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.set('home', path.join(__dirname, '/public/views/home.html'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
});

app.get('/advertisement', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/advertisement.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.post('/mail', (req, res) => {
    const mailgun = require("mailgun-js");
    const DOMAIN = "sandbox5767c1c8786e44109a8b50747125317e.mailgun.org";
    const mg = mailgun({apiKey: "b7a42f6fdafdb4939e0cc9b82ff0cc58-443ec20e-bec81816", domain: DOMAIN});
    const data = {
        from: "JobBoard <contact@jobboard.com>",
        to: "olivia.benoit@epitech.eu",
        subject: "Candidature pour l'offre",
        text: req.body.message + ". Pour contacter " + req.body.name + ", vous pouvez envoyer un mail à l'adresse suivante : " + req.body.email + ". ou télephoner au : " + req.body.phone
    };

    mg.messages().send(data, function (error, body) {
    console.log(body);
    });
})