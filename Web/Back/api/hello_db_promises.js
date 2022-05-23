// We need the mysql module for node js: https://github.com/mysqljs/mysql
// npm install mysql
// We also use the mysql2 module for its promise implementation: http://sidorares.github.io/node-mysql2/
// npm install mysql2

import mysql from 'mysql2/promise'

let connection = null;

try
{
    connection = await mysql.createConnection(
    {
        host:'localhost', 
        user:'hagen', 
        password:'M4sqls3rv3r.', 
        database: 'api_game_db'
    })
    
    console.log("Connection stablished!")

    const [rows, fields] = await connection.execute('select * from users');
    
    console.log(Object.keys(rows[0]))

    for (const r of rows)
    {
        console.log(Object.values(r))
    }

    console.log(rows)
}
catch(error)
{
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