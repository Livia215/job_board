const express = require('express');
var path = require('path');
require("dotenv").config()
const app = express();
const jwt = require("jsonwebtoken");
let dbConn = require('./config/dbConfig');
const { hash }=require('./back/hash');
const { exec } = require('child_process');
const { title } = require('process');

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
app.get('/advertisement', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/advertisement.html'));
});



// route back 
app.post('/addUsers', async (req,res)=> {
    const connection = await dbConn;
    const psw = hash(req.body.password);
    const first_name = req.body.first_name
    const last_name= req.body.last_name
    const email = req.body.email
    const birthday= req.body.birthday
    const phone= req.body.phone
    const user_desc= req.body.user_desc
    const payload={
        "first_name": first_name,
        "last_name":last_name,
        "email":email,
        "phone":phone,
        "birthday":birthday,
        role:"user",
    }
    try {
        await connection.execute(`insert into Users (first_name, last_name, email, birthday, phone, description,password) values ( "${first_name}", "${last_name}", "${email}", "${birthday}", "${phone}", "${user_desc}", "${psw}");`);
    } catch (error) {
        console.log(error);
    }
    SESSION.push(jwt.sign(payload, process.env.TOKEN_SECRET, option))
    console.log(SESSION);
    res.json(jwt.sign(payload, process.env.TOKEN_SECRET, option));
    
})

app.post('/addCompagnies', async (req,res)=> {
    const connection = await dbConn;
    const psw = hash(req.body.password);
    console.log(req.body.password);
    const name = req.body.compagnie_name
    const address= req.body.address
    const email = req.body.email
    const compagnie_desc= req.body.compagnie_desc
    const link= req.body.link
    const role = "compagnie" 
    const siret = req.body.siret
    const payload={
        "name": name,
        "address":address,
        "compagnie_desc":compagnie_desc,
        "email":email,
        "link":link,
        "role":role,
        "siret":siret
    }
    try {
        await connection.execute(`insert into Compagnies (address, compagnie_name, compagnie_description, link, email, password,siret,role) values ( "${address}", "${name}", "${compagnie_desc}", "${link}", "${email}", "${psw}", "${siret}", "${role}");`);
    } catch (error) {
        console.log(error);
    }
    SESSION.push(jwt.sign(payload, process.env.TOKEN_SECRET, option))
    res.json(jwt.sign(payload, process.env.TOKEN_SECRET, option));
    
})

app.post('/loginUsers', async (req,res)=> {
    let password = hash(req.body.password)
    let email = req.body.email
    const connection = await dbConn;
    const [row,_] = await connection.execute(`SELECT * from Users WHERE email='${email}'`);
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
app.post('/addAdvetisement', async (req,res)=> {
    console.log("je suis dans le back");
    const title = req.body.title
    const short_desc =req.body.short_desc
    const long_desc = req.body.long_desc
    const contract = req.body.contract
    const wage = req.body.wage
    const city = req.body.city
    const domain = req.body.domain
    const date_start =req.body.date_start
    const date_end = req.body.date_end
    const compagnies_id= req.body.Compagnies_id
    const connection = await dbConn;

    try {
        if (date_end===null) {
            await connection.execute(`INSERT INTO Advertisements (short_desc, long_desc, title, contract, wage, city, domain, date_start, Compagnies_id) VALUES ('${short_desc}', '${long_desc}', '${title}', '${contract}', '${wage}', '${city}', '${domain}', '${date_start}', ${compagnies_id})`);
            
        }else{
            await connection.execute(`INSERT INTO Advertisements (short_desc, long_desc, title, contract, wage, city, domain, date_start, date_end, Compagnies_id) VALUES ('${short_desc}', '${long_desc}', '${title}', '${contract}', '${wage}', '${city}', '${domain}', '${date_start}', '${date_end}', ${compagnies_id})`);

        }
    } catch (error) {
        console.log(error);
    }    
})
app.post('/displayAdvertisements',async (req,res)=> {
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT a.*, c.compagnie_name FROM Advertisements as a INNER JOIN compagnies as c where c.id=a.Compagnies_id`);
    let addvertisement
    let payload = []
    rows.forEach(row => {
        addvertisement={
            id:row.id,
            short_desc: row.short_desc,
            long_desc:row.long_desc,
            title:row.title,
            contract:row.contract,
            wage:row.wage,
            city:row.city,
            domain:row.domain,
            date_start: row.date_start,
            date_end: row.date_end,
            compagnies_name:row.compagnie_name,
        }
        payload.push(addvertisement)
    });
    SESSION.push(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));
    res.json(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));
})

app.post('/addApplication', async (req, res) => {
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT a.*, c.compagnie_name, c.email FROM Advertisements as a INNER JOIN compagnies as c WHERE a.id=${req.body.id_advertisement}`);
    const message= req.body.message
    const user_email = req.body.email
    const advertisement_id= req.body.id_advertisement
    try {
        await connection.execute(`INSERT INTO Applications (message, Users_email, Advertisements_id ) VALUE ('${message}', '${user_email}', ${advertisement_id})`)
        
    } catch (error) {
        console.log(error);
    }    
    // we not buy mailgun lisence. So we can't send email about more than 5 people. So we send email to olivia
    // const compagnie_email = rows[0].email
    const compagnie_email="olivia.benoit@epitech.eu"
    const advertisement_title= rows[0].title

    const mailgun = require("mailgun-js");
    const DOMAIN = "sandbox5767c1c8786e44109a8b50747125317e.mailgun.org";
    const mg = mailgun({apiKey: "b7a42f6fdafdb4939e0cc9b82ff0cc58-443ec20e-bec81816", domain: DOMAIN});
    const data = {
        from: "JobBoard <contact@jobboard.com>",
        to: compagnie_email,
        subject: `Candidature pour l'offre ${title}`,
        text: req.body.message + ". Pour contacter " + req.body.name + ", vous pouvez envoyer un mail à l'adresse suivante : " + req.body.email + ". ou télephoner au : " + req.body.phone
    };
    
    mg.messages().send(data, function (error, body) {
    });
    res.json({'end':true})
    
})


app.listen(process.env.PORT, () => {

    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});