const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require("dotenv").config()
const app = express();
const jwt = require("jsonwebtoken");
let dbConn = require('./config/dbConfig');
const { hash }=require('./back/hash')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


SESSION=[];
let option={ expiresIn: '1800s' }


// route view
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/register.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/index.html'));
});
app.get('/useraccount', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/users.html'));
});
app.get('/companieaccount', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/companies.html'));
});



// route back 
app.post('/create', async (req,res)=> {
    const connection = await dbConn;
    let psw = hash(req.body.password);
    try {
        await connection.execute(`insert into Users (first_name, last_name, email, birthday, phone, description,password) values ( "${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${req.body.birthday}", "${req.body.phone}", "${req.body.description}", "${psw}");`);
        await res.sendFile(path.join(__dirname+'/public/views/home.html'));
    } catch (error) {
        console.log(error);
    }

})

app.post('/loginUsers', async (req,res)=> {
    console.log('test back');
    let password = hash(req.body.password)
    let email = req.body.email
    const connection = await dbConn;
    const [row,_] = await connection.execute(`select * from Users WHERE email='${email}'`);
    if (row[0].email==email && row[0].password==password) {
        let payload={
            "id":row[0].id,
            first_name: row[0].first_name,
            last_name:row[0].last_name,
            email:row[0].email,
            phone:row[0].phone,
            birthday:row[0].birthday,
            role:row[0].birthday,
        }
        SESSION.push(jwt.sign(payload, process.env.TOKEN_SECRET, option))
        console.log(SESSION);
        res.json(jwt.sign(payload, process.env.TOKEN_SECRET, option));
    }else{
        res.status(403)
    }
})

app.get('/logout', async (req,res)=> {
    res.json({"logout":true});
})
app.post('/update', async (req,res)=> {

})
app.post('/delete',async (req,res)=> {

})

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

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});
