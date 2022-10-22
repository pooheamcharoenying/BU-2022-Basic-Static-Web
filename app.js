const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var path = require('path');

var visitors = 0;
const fs = require('fs');

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// const Users = require('./models/User');

// //import Mongoose
// const mongoose = require('mongoose');

// const db = "mongodb+srv://pooh:01password@cluster0.lfxswgo.mongodb.net/TestDatabase?retryWrites=true&w=majority";

// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => {
//         console.log('MongoDB Connected...')

//         // Users.find()
//         //     .then(items => console.log('item found', items));

//         var newUser = new Users({ name: 'Pol Pol', age: 80 });
//         newUser.save().then(user => {
//             console.log('user saved')
//         })

//     })
//     .catch(err => console.log(err));



app.get('/', (req, res) => {
    visitors = visitors + 1
    console.log('user visted homepage', visitors)


    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html';

    mongoose
        .connect(db, { useNewUrlParser: true })
        .then(() => {
            console.log('MongoDB Connected...')


            var newUser = new Users({ name: 'Andy Carrol', age: 13 });

            // save model to database
            // newUser.save().then(user => {
            //     console.log('user saved')
            // })

            res.sendFile(fileName, options, function (err) {
                if (err) {
                    next(err);
                } else {
                    console.log('Sent:', fileName);
                }
            });


            // Users.find()
            //     .then(items => {
            //         console.log('item found',items)
            //         res.sendFile(fileName, options, function (err) {
            //             if (err) {
            //                 next(err);
            //             } else {
            //                 console.log('Sent:', fileName);
            //             }
            //         });
            //     });


        })
        .catch(err => console.log(err));




})

var users = []

fs.readFile('users.json', 'utf8', (err, jsonString) => {
    const data = JSON.parse(jsonString)
    users = data;
})

app.get('/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    fs.readFile('users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        const data = JSON.parse(jsonString)
        res.status(200).json(data)
    })
})

app.post('/addUser', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    console.log('resulto', req.body)
    users.push(req.body)

    console.log('users', users)
    const data = JSON.stringify(users);
    fs.writeFile('users.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
        res.status(201).json(req.body)
    });
})

app.post('/clearUsers', (req, res) => {
    console.log('clear Users')
    users = []

    const data = JSON.stringify(users);
    fs.writeFile('users.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
        res.status(201).json(req.body)
    });
})


app.get('/page2', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello Bangkok University Students;');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });