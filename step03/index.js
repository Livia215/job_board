const express = require('express');
var path = require('path');
const app = express();
const port = 4000;

// app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.set('home', path.join(__dirname, '/public/views/home.html'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/home.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});