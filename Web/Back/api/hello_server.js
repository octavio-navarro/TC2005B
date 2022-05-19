"use strict"

import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000

app.use(express.json())
app.use('/css', express.static('./css'))
app.use('/js', express.static('./js'))

app.get('/', (req, res)=>
{
    fs.readFile('./html/helloWorld.html', 'utf8', 
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

app.get('/api/hello', (req, res)=>
{
    // console.log(req.query)
    // if(req.query.name !== undefined && req.query.surname !== undefined)
    // if('name' in req.query && 'surname' in req.query)
    if(req.query.hasOwnProperty('name') && req.query.hasOwnProperty('surname'))
        res.send(`Hello ${req.query.name} ${req.query.surname}`)
    else
        res.send('Hello!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})