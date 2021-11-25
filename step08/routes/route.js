let express = require('express')
require("dotenv").config()
let route = express.Router();


module.exports= () => {
    const app = express();
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
    
    
    // route back 
    app.get('/create', (req,res)=> {
        jobboard.query(`SELECT * FROM Users`,(err,res) =>{
            return console.log(res);
        });
    })
    
    app.get('/select', (req,res)=> {
    
    })
    app.get('/update', (req,res)=> {
    
    })
    app.get('/delete', (req,res)=> {
    
    })
}