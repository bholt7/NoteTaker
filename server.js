// grabbing dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const dataBase = require('./db/db.json');

// invoking express app
const app = express();
const PORT = 3001;

// linking front end to back 
app.use(express.static('public'));

// setting up json data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json);

// grabbing the index.html so that it loads on page load
app.get('/', (req, res)=> res.sendFile(path.join(__dirname,'/public/index.html')));

// grabbing notes html so that it will appear when "get started" is clicked
app.get('/notes', (req, res)=> res.sendFile(path.join(__dirname, '/public/notes.html')));

// endpoints

app.route('/api/notes').get((req,res)=> res.json(dataBase))

// adding notes to the json file
.post((req, res)=> {
    let fp = path.join('/db/db.json')
    let createNote = req.body;

    let highid = 99;

    for (let i = 0; i < dataBase.length; i++) {
        let note = dataBase[i];
        
        if(note.id > highid) {
        highid = note.id
        }
    }

    createNote.id =id + 1;
    dataBase.push(createNote);

    fs.writeFile(fp, JSON.stringify(dataBase), (err)=> {
        err ? console.error(err) : console.log("Note Saved")

})

res.json(createNote)
});





app.listen(PORT, ()=> console.log(`App is running on port: http://localhost:${PORT}`))