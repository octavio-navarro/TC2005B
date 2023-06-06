import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv/config'  // Load environment variables from .env file

import { router } from './routes/index.js'  // Import the router from the routes folder

import ratelimit from 'express-rate-limit'

const PORT = process.env.PORT || 5000  // Set the server port, defaulting to 5000 if not specified in the environment

const limiter = ratelimit({
    windowMs: 10 * 60 * 1000,  // Set the time window for rate limiting to 10 minutes
    max: 6  // Allow a maximum of 6 requests per 10 minutes
})

const app = express()

app.use(cors())  // Enable Cross-Origin Resource Sharing (CORS)
app.use(limiter)  // Apply rate limiting to all requests
app.use(express.json())  // Parse incoming requests with JSON payloads
app.use(express.static('public'))  // Serve static files from the 'public' directory

app.set('trust proxy', 1)  // Enable trust proxy to handle reverse proxies (e.g., Heroku)

app.use('/api', router)  // Mount the router at the '/api' endpoint

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  // Start the server and log a message to indicate the port it's running on
})
