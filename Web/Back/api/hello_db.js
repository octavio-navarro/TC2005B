// We need the mysql module for node js: https://github.com/mysqljs/mysql
// npm install mysql

import mysql from 'mysql'

// create the connection to database
const connection = mysql.createConnection(
    {
        host:'172.31.160.1', 
        user:'hagen', 
        password:'0412M4sqls3rv3r.', 
        database: 'api_game_db'
    })

connection.connect(error=>
    {
        if (error) console.log(error)
        console.log('Connected to mysql!')
    })

// rows contains rows returned by server
// fields contains extra meta data about results, if available
connection.query('select * from users', (error, rows, fields)=> 
    {
        if(error) console.log(error)
        for (const r of rows)
        {
            console.log(Object.keys(r))
            console.log(Object.values(r))
        }
        console.log(rows)
        // console.log(fields)
    })

connection.end(error=>
    {
        if(error) console.log(error)
        console.log("Connection closed successfully!")
    })