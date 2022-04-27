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

connection.query('select id_users from users', (error, user_rows, fields)=>
{
    if(error) console.log(error)
    const id_users = user_rows.map(r=>r['id_users'])

    connection.query('select id_levels from levels', (error, level_rows, l_fields)=>
    {
        if(error) console.log(error)
        const id_levels = level_rows.map(r=>r['id_levels'])

        for(let i = 0; i<20; i++)
        {
            const attempt_date = new Date()
            const completed = Math.floor(Math.random() * 2)

            const user_level_data = {
                id_user: id_users[Math.floor(Math.random() * id_users.length)],
                id_level: id_levels[Math.floor(Math.random() * id_levels.length)],
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
    })
})