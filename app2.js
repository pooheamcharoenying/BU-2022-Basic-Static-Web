const express = require('express')
const app = express()
const port = 3000
var path = require('path');

var visitors = 0;


var bodyParser = require('body-parser')
app.use(bodyParser.json())

const testUsers = [
    {
        name: 'Henry Kissinger',
        age: 87
    },
    {
        name: 'Mark Noble',
        age: 38
    },
    {
        name: 'Tata Young',
        age: 42
    }
]

app.get('/users', (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.status(200).json(testUsers)
})

app.post('/addUser', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('post data result:', req.body)
    const newUser = req.body
    testUsers.push(req.body)
    res.status(200).json(testUsers)
})

app.get('/', (req, res) => {
    visitors = visitors + 1;

    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html';
    
    res.sendFile('index3.html', options)
})

app.get('/book1', (req, res) => {
    res.send('Hello World - Book 1')
})

app.get('/book1/page1', (req, res) => {
    res.send('Hello World - Book 1 - Page 1')
})

app.get('/book1/page2', (req, res) => {
    res.send('Hello World - Book 1 - Page 2')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})