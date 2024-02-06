"use strict"

import express from 'express'
import mysql from 'mysql2/promise'
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

app.get('/api/users', async (request, response)=>{
    let connection = null

    try{

        connection = await connectToDB()

        let [results, fields] = await connection.query('select * from users')
        

        console.log("Sending data correctly.")
        response.status(200)
        response.json(results)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

app.get('/api/levels', async (request, response)=>{
    let connection = null

    try{

        connection = await connectToDB()

        const [results, fields] = await connection.query('select * from top_levels')
        
        
        // connection.query('select * from levels where completion_rate is not null order by completion_rate desc limit 5', (error, results, fields)=>{

        console.log("Sending data correctly.")
        response.status(200)
        response.json(results)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

app.get('/api/levels/:level_name', async (request, response)=>{

    let connection = null

    try
    {
        connection = await connectToDB()

        // const statement = await connection.prepare('select * from top_levels where name = ?')
        // const [rows, columns] = await statement.execute([request.params.level_name])

        const [rows, columns] = await connection.execute('select * from top_levels where name = ?', [request.params.level_name])

        console.log(`Params: ${request.params.level_name}`)
        console.log("Sending data correctly.")
        response.status(200)
        response.json(rows)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})


app.listen(port, ()=>
{
    console.log(`App listening at http://localhost:${port}`)
})