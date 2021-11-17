const express = require('express');
var path = require('path');
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/register.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});