
"use strict"

import express from 'express'
import mysql from 'mysql'
import fs from 'fs'

const app = express()
const port = 5000

app.use(express.json())

// Since we are using the chart module installed from node js, we need to expose it so that the web page can use it.
app.use(express.static('./public'))

function connectToDB()
{
    return mysql.createConnection({host:'localhost', user:'hagen', password:'M4sqls3rv3r.', database:'api_game_db'})   
}

app.get('/', (request, response)=>{
    fs.readFile('./public/html/user_charts.html', 'utf8', (err, html)=>{
        if(err) response.status(500).send('There was an error: ' + err)
        console.log('Loading page...')
        response.send(html)
    })
})

app.get('/api/users', (request, response)=>{
    let connection = connectToDB()

    try{

        connection.connect()

        connection.query('select * from users', (error, results, fields)=>{
            if(error) {
                console.log(error)
                response.status(500)
            }
            else{
                console.log("Sending data correctly.")
                response.status(200)
                response.json(results)
            }
        })

        connection.end()
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
})

app.get('/api/levels', (request, response)=>{
    let connection = connectToDB()

    try{

        connection.connect()

        connection.query('select * from levels where completion_rate is not null order by completion_rate desc limit 5', (error, results, fields)=>{
            if(error) console.log(error)
            console.log("Sending data correctly.")
            response.status(200)
            response.json(results)
        })

        connection.end()
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
})


app.listen(port, ()=>
{
    console.log(`App listening at http://localhost:${port}`)
})