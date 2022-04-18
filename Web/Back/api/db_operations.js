import mysql from 'mysql'
import { getRandomName, getRandomWord } from './fetch_random.js'

function randomString(length) 
{
    let result = ''
    let characters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++ ) 
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   
   return result
}

const names = await getRandomName(20)
const words = await getRandomWord(10)

const connection = mysql.createConnection(
    {
        host:'localhost', 
        user:'hagen', 
        password:'M4sqls3rv3r.', 
        database: 'api_game_db'
    })

connection.connect(error=>
    {
        if (error) console.log(error)
        console.log('Connected to mysql!')
    })

for(const n of names)
{
    let [name, surname] = n.split(" ")
    const user_data = { name: name, surname: surname}

    connection.query('insert into users set ?', user_data, (error, rows, fields)=> 
    {
        if(error) console.log(error)
        console.log(`Added ${name} ${surname} successfully!`)
    })
}

for(const w of words)
{
    const types = ['standard', 'speed run', 'versus']

    const level_data =
    {
         name: w,
         type: types[Math.floor(Math.random() * types.length)],
         description: randomString(20),
         creation_date: new Date()
    }

    connection.query('insert into levels set ?', level_data, (error, rows, fields)=> 
    {
        if(error) console.log(error)
        console.log(`Added level ${w} successfully!`)
    })
}

for(let i = 0; i<20; i++)
{
    const user_id = Math.floor(Math.random() * 20)+1
    const level_id = Math.floor(Math.random() * 10)+1
    const attempt_date = new Date()
    const completed = Math.floor(Math.random() * 2)

    const user_level_data = {
        id_user: user_id,
        id_level: level_id,
        attempt_date: attempt_date,
        completed:  completed
    }

    connection.query('insert into user_level set ?', user_level_data, (error, rows, fields)=> 
    {
        if(error) console.log(error)
        console.log(`Added attempt successfully!`)
    })
}

connection.end(error=>
    {
        if(error) console.log(error)
        console.log("Connection closed successfully!")
    })