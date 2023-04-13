import express from 'express'
import fs from 'fs'

const app = express()
app.use(express.static('./public'))

app.get('/', (req, res)=>
{
    fs.readFile('./public/html/index.html', 'utf8', 
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

app.get('/api/hello', (req, res) => {
    res.send('Hello World!')
})

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
})

