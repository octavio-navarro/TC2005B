import express from 'express'
import fetch from 'node-fetch'
import apicache from 'apicache'
import cors from 'cors'

const router = express.Router()

// Environment variables

const API_BASE_URL = process.env.API_BASE_URL  // Base URL for the API
const API_KEY = process.env.API_KEY  // API key for authentication

const cache = apicache.middleware  // Middleware for caching API responses

const corsOptions = {
    origin: `http://localhost:${process.env.PORT || 5000}`,  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

router.get('/:lat/:lon', cors(corsOptions), cache('2 minutes'), async (req, res) => {
    try {
        const { lat, lon } = req.params  // Extract latitude and longitude from the request parameters

        if (lat === undefined || lon === undefined)
            throw new Error('Missing parameters')  // Throw an error if latitude or longitude is missing

        const URL = `${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`  // Construct the URL for the API request

        const response = await fetch(URL, { method: 'GET' })  

        res.status(200).json({ data: await response.json() })  // Return the API response as JSON data
    } catch (error) {
        res.status(500).json({ error: error })  // If an error occurs, return the error message as JSON
        console.log(error)  // Log the error to the console
    }
})

export { router }
