"use strict"

// Import the express library
import express from 'express'

// Import the file system library
import fs from 'fs'

// Create a new express application
const app = express()

// Define the port to listen on
const port = 3000

// Use the express.json() middleware to parse the body of the request
app.use(express.json())

// The ./public directory will be used to serve static files (html, css, js, images, etc.)
app.use(express.static('./public'))

// The root route will serve the helloWorld.html file, which is located in the ./public/html directory
app.get('/', (req, res)=>
{
    fs.readFile('./public/html/helloWorld.html', 'utf8', 
    (err, html) => {
        if(err)
        {
            res.status(500).send('There was an error: ' + err)
            return 
        }
        
        console.log("Sending page...")
        res.send(html)
        console.log("Page sent!")
    })
})

// The /api/hello route will return a simple greeting. The name and surname parameters are optional, and can be passed as query parameters.
app.get('/api/hello', (req, res)=>
{
    console.log(req.query)
    // The hasOwnProperty method is used to check if a property exists in the request object
    if(req.query.hasOwnProperty('name') && req.query.hasOwnProperty('surname'))
        res.send(`Hello ${req.query.name} ${req.query.surname}`)
    else
        res.send('Hello!')
})

// The /api/greeting/:name/:surname route will return a simple greeting. The name and surname parameters are required, and can be passed as parameters.
app.get('/api/greeting/:name/:surname', (req, res)=>{
    console.log(req.params)
    if(req.params.hasOwnProperty('name') && req.params.hasOwnProperty('surname'))
        res.send(`Hello ${req.params.name} ${req.params.surname}`)
    else
        res.send('Hello!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})