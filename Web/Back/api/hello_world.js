"use strict"

import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

app.get('/api/hello', (req, res) => {
  const {name} = req.body
  res.send(`Hello ${name}`)
  // res.send({message: `Hello ${name}`})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})