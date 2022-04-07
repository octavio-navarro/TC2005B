import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000

app.use(express.json())

app.get('/api/users', (req, res) =>
{
    fs.readFile('./files/users.json', 'utf8', (err, file)=>
    {
        if(err)
            res.status(500).send('There was an error: ' + err)
        res.json(JSON.parse(file))
    })
})

app.post('/api/users', async (req, res)=>
{
    try
    {
        let user = req.body

        // let data = JSON.parse(fs.readFileSync('./files/users.json', 'utf8'))
        let data = JSON.parse(await fs.promises.readFile('./files/users.json', 'utf8'))
        
        data["users"].push(user)

        fs.writeFile('./files/users.json', JSON.stringify(data), (err) =>
        {
            if (err)
                res.status(500).send('There was an error: ' + err)
        })

        res.send("Added successfully")
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send("Bad request")
    }
})

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})