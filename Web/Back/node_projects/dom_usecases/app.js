"use strict"

import express from 'express'

import fs from 'fs'

// Sample data
let items = [
    { id: 1, name: 'Healing Potion', type: 'Potion', effect: 'Restores 50 HP' },
    { id: 2, name: 'Mana Potion', type: 'Potion', effect: 'Restores 30 MP' },
    { id: 3, name: 'Iron Sword', type: 'Weapon', effect: 'Basic melee weapon' }
];

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', items: [1, 2] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', items: [3] }
];

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.static('./public'))

// Routes definition and handling
app.get('/', (request,response)=>{
    fs.readFile('./public/html/index.html', 'utf8', (err, html)=>{
        if(err) response.status(500).send('There was an error: ' + err)
        console.log('Loading page...')
        response.send(html)
    })
})

// GET endpoint to retrieve all items
app.get('/api/items', (req, res) => {
  try{
    res.json(items);
    console.log("Items Fetched");
  }
  catch(error){
    res.status(500).json({message: "Error on the server"});
  }
});

// GET endpoint to retrieve all users
app.get('/api/users', (req, res) => {
  try{
    res.json(users);
    console.log("Users fetched");
  }
  catch(error){
    res.status(500).json({message: "Error on the server"});
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
