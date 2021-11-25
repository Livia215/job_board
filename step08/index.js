const express = require('express');
var path = require('path');
require("dotenv").config()
const app = express();
const jwt = require("jsonwebtoken");
let dbConn = require('./config/dbConfig');
const { hash }=require('./back/hash');
const { exec } = require('child_process');
const { title } = require('process');
const { link } = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


SESSION=[];
let option={ expiresIn: '1800s' }




// route view
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/loginAdmin.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/index.html'));
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
app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/users.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/admin/companies.html'));
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
    const name = req.body.compagnie_name
    const address= req.body.address
    const email = req.body.email
    const compagnie_desc= req.body.compagnie_desc
    const link= req.body.link
    const role = "compagnie" 
    const siret = req.body.siret
    var payload={}
    try {
        await connection.execute(`insert into Compagnies (address, compagnie_name, compagnie_description, link, email, password,siret,role) values ( "${address}", "${name}", "${compagnie_desc}", "${link}", "${email}", "${psw}", "${siret}", "${role}");`);
        const [row,_] = await connection.execute(`SELECT id from Compagnies where email="${email}"`);
        payload={
            "id":row[0].id,
            "name": name,
            "address":address,
            "compagnie_desc":compagnie_desc,
            "email":email,
            "link":link,
            "role":role,
            "siret":siret
        }
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
            role:row[0].role,
        }
        SESSION.push(jwt.sign(payload, process.env.TOKEN_SECRET, option))
        console.log(SESSION);
        res.json(jwt.sign(payload, process.env.TOKEN_SECRET, option));
    }else{
        res.status(403)
    }
})
app.post('/loginAdmin', async (req,res)=> {
    console.log("touche");
    let password = hash(req.body.password)
    let email = req.body.email
    const connection = await dbConn;
    const [row,_] = await connection.execute(`SELECT * from Users WHERE email='${email}'`);
    if (row[0].email==email && row[0].password==password && row[0].role=="admin") {
        let payload={
            "id":row[0].id,
            first_name: row[0].first_name,
            last_name:row[0].last_name,
            email:row[0].email,
            phone:row[0].phone,
            birthday:row[0].birthday,
            role:row[0].role,
        }
        SESSION.push(jwt.sign(payload, process.env.TOKEN_SECRET, option))
        console.log(SESSION);
        res.json(jwt.sign(payload, process.env.TOKEN_SECRET, option));
    }else{
        res.json({
            "admin":false
        })
        res.status(403)

    }
})

app.post('/loginCompagnies', async (req,res)=> {
    let password = hash(req.body.password)
    let email = req.body.email
    console.log(email);
    const connection = await dbConn;
    const [row,_] = await connection.execute(`SELECT * from Compagnies WHERE email='${email}'`);
    if (row[0].email==email && row[0].password==password) {
        let payload={
            "id":row[0].id,
            "email":row[0].email,
            "compagnie_name":row[0].compagnie_name,
            "siret":row[0].siret,
            "role":row[0].role,
        }
        SESSION.push(jwt.sign(payload, process.env.TOKEN_SECRET, option))
        res.json(jwt.sign(payload, process.env.TOKEN_SECRET, option));
    }else{
        res.json({error:"incorrect username or password"});
        res.status(403);
    }
})

app.get('/logout', async (req,res)=> {
    res.json({"logout":true});
})
app.post('/addAdvetisement', async (req,res)=> {
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
            await connection.execute(`INSERT INTO Advertisements (short_desc, long_desc, title, contract, wage, city, domain, date_start, Compagnies_id) VALUES ("${short_desc}", "${long_desc}", "${title}", "${contract}", "${wage}", "${city}", "${domain}", "${date_start}", ${compagnies_id})`);
            
        }else{
            await connection.execute(`INSERT INTO Advertisements (short_desc, long_desc, title, contract, wage, city, domain, date_start, date_end, Compagnies_id) VALUES ("${short_desc}", "${long_desc}", "${title}", "${contract}", "${wage}", "${city}", "${domain}", "${date_start}", "${date_end}", ${compagnies_id})`);
        }
        res.json({"add":true})
    } catch (error) {
        console.log(error);
        res.json({"add":true})

    }    
})
app.post("/displayAdvertisements",async (req,res)=> {
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT a.*, c.compagnie_name FROM Advertisements as a INNER JOIN Compagnies as c where c.id=a.Compagnies_id`);
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
app.post('/displayAdvertisementsCompanies',async (req,res)=> {
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT a.*, c.compagnie_name FROM Advertisements as a INNER JOIN Compagnies as c where c.id=a.Compagnies_id and c.id="${req.body.id}"`);
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
app.post('/displayAdvertisementsUsers',async (req,res)=> {
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT c.compagnie_name, ad.*, ap.* FROM Compagnies as c  INNER JOIN Advertisements as ad INNER JOIN Applications as ap where c.id=ad.Compagnies_id and ap.Users_email="${req.body.email}" and ad.id=ap.Advertisements_id`);
    let addvertisement
    let payload = []
    console.log(rows);
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
    const [rows,_] = await connection.execute(`SELECT a.*, c.compagnie_name, c.email FROM Advertisements as a INNER JOIN Compagnies as c WHERE a.id=${req.body.id_advertisement}`);
    const message= req.body.message
    const user_email = req.body.email
    const advertisement_id= req.body.id_advertisement
    try {
        await connection.execute(`INSERT INTO Applications (message, Users_email, Advertisements_id ) VALUE ("${message}", "${user_email}", ${advertisement_id})`)
        
    } catch (error) {
        console.log(error);
    }    
    // we not buy mailgun lisence. So we can't send email about more than 5 people. So we send email to olivia
    // const compagnie_email = rows[0].email
    const compagnie_email="olivia.benoit@epitech.eu"
    const advertisement_title= rows[0].title;


    const mailgun = require("mailgun-js");
    const DOMAIN = "xxx";
    const mg = mailgun({apiKey: "xxx", domain: DOMAIN});
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

app.post('/adminUsers', async (req,res)=>{
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT * FROM Users`);
    let user
    let payload = []
    rows.forEach(row => {
        user={
            "id":row.id,
            "first_name":row.first_name,
            "last_name": row.last_name,
            "email":row.email,
            "role":row.role,
            "desc_user": row.description,
            "phone": row.phone,
        }
        payload.push(user)
    });
    SESSION.push(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));
    res.json(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));

})

app.post('/adminCompagnies', async (req,res)=>{
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT * FROM Compagnies`);
    let compagnie
    let payload = []
    rows.forEach(row => {
        compagnie={
            "id":row.id,
            "compagnie_name":row.compagnie_name,
            "address": row.address,
            "email":row.email,
            "link": row.link
        }
        payload.push(compagnie)
    });
    SESSION.push(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));
    res.json(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));

})

app.post('/adminAdvertisement', async (req,res)=>{
    const connection = await dbConn;
    const [rows,_] = await connection.execute(`SELECT a.*, c.compagnie_name FROM Advertisements as a INNER JOIN Compagnies as c where c.id=a.Compagnies_id`);
    let payload = []
    let advertisement
    rows.forEach(row => {
        addvertisement={
            "id": row.id,
            "title":row.title,
            "domain": row.domain,
            "contract": row.contract,
            "email":row.email,
            "compagnie_name":row.compagnie_name,
            "created_at":row.created_at
        }
        payload.push(addvertisement)
    });
    SESSION.push(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));
    res.json(jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET));

})

app.post ('/deleteUsers',async (req,res)=>{
    try {
        const connection = await dbConn;
        const [rows,_] = await connection.execute(`DELETE FROM Users WHERE id="${req.body.id}"`);
        res.json({delete:true})
    } catch (error) {
        res.json({delete:false})
    }
})
app.post ('/deleteCompagnies',async (req,res)=>{
    try {
        const connection = await dbConn;
        const [rows,_] = await connection.execute(`DELETE FROM Compagnies WHERE id="${req.body.id}"`);
        res.json({delete:true})
    } catch (error) {
        res.json({delete:false})
    }
})
app.post ('/deleteAdvertisements',async (req,res)=>{
    try {
        const connection = await dbConn;
        const [rows,_] = await connection.execute(`DELETE FROM Advertisements WHERE id="${req.body.id}"`);
        res.json({delete:true})
    } catch (error) {
        res.json({delete:false})
    }
})
app.post ('/updateUsers',async (req,res)=>{
    const id = req.body.id;
    const first_name = req.body.first_name
    const last_name= req.body.last_name
    const birthday= req.body.birthday
    const phone= req.body.phone
    const user_desc= req.body.user_desc
    const role = req.body.role
    try {
        const connection = await dbConn;
        const [rows,_] = await connection.execute(`UPDATE Users SET first_name = '${first_name}',last_name = '${last_name}',phone = '${phone}' ,description= '${user_desc}' ,role = '${role}' WHERE id="${id}"`);
        res.json({delete:true})

    } catch (error) {
        console.log(error);
        res.json({
            "delete":false,
            "error":error
        })
    }
})
app.post ('/updateCompagnies',async (req,res)=>{
    const id = req.body.id;
    const companie_name = req.body.companie_name
    const address= req.body.address
    const link = req.body.link
    const companie_desc = req.body.compagnie_desc
    try {
        const connection = await dbConn;
        const [rows,_] = await connection.execute(`UPDATE Compagnies SET compagnie_name = '${companie_name}',address = '${address}', link = '${link}',compagnie_description = '${companie_desc}' WHERE id="${id}"`);
        res.json({update:true})

    } catch (error) {
        console.log(error);
        res.json({
            "update":false,
            "error":error
        })
    }
})

app.listen(process.env.PORT, () => {

    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});