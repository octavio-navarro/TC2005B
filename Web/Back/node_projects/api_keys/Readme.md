# Express API Server

This is an Express.js API server that fetches weather data based on latitude and longitude coordinates. The information is obtained from the [OpenWeather.org](https://openweathermap.org/) API. To access it, you need to create an acount in order to be given an API Key. 

API Keys are unique identifiers that authenticates requests associated with your project for usage and billing purposes. 

We will use the [API key](https://www.fortinet.com/resources/cyberglossary/api-key) from within the server to avoid exposing it in the client. 

The server also includes rate limiting, caching, and a CORS configuration for our routes.

## Prerequisites

Before running the server, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Dependencies

The following dependencies are used in this project:

- `apicache`: Version 1.6.3
  - Description: A simple and flexible API response caching middleware for Express.js.
  - [GitHub Repository](https://github.com/kwhitley/apicache)

- `cors`: Version 2.8.5
  - Description: Cross-Origin Resource Sharing (CORS) middleware for Express.js.
  - [GitHub Repository](https://github.com/expressjs/cors)

- `dotenv`: Version 16.1.4
  - Description: Loads environment variables from a `.env` file into `process.env`.
  - [GitHub Repository](https://github.com/motdotla/dotenv)

- `express`: Version 4.18.2
  - Description: Fast, unopinionated, minimalist web framework for Node.js.
  - [GitHub Repository](https://github.com/expressjs/express)

- `express-rate-limit`: Version 6.7.0
  - Description: Basic rate-limiting middleware for Express.js.
  - [GitHub Repository](https://github.com/nfriedly/express-rate-limit)

- `node-fetch`: Version 3.3.1
  - Description: A light-weight module that brings `window.fetch` to Node.js.
  - [GitHub Repository](https://github.com/node-fetch/node-fetch)

These dependencies are automatically installed when running `npm install`.

## Getting Started

1. Clone the repository:

   ```shell
   git clone <repository-url>
   ```

2. Install dependencies:
    ```shell
    npm install
    ```

3. Set up environment variables:

    Create a .env file in the root directory and provide the following variables:

    ```shell
    API_BASE_URL=<API Base URL>
    API_KEY=<API Key>
    PORT=<Port Number>
    ```

    Replace `<API Base URL>` with the base URL of the weather API you're using, `<API Key>` with your API key, and `<Port Number>` with the desired port number for the server (default is 5000). For this application, the `<API Base URL>` is the OpenWeather URL: `'https://api.openweathermap.org/data/2.5/weather'`. A sample `.env` file (`.env.example`), with only the API Key field missing, is provided as reference.

4. Start the server:

    ```shell
    npm start
    ```

## Code Structure

The codebase is organized as follows:

- routes/index.js: Contains the [Express router](https://expressjs.com/en/guide/routing.html) for handling API routes.
- app.js: The main entry point of the application where the Express app is configured.
- .env: Environment variable configuration file.
- public: Directory for serving static files.

## API Routes

The server provides the following API route:

- GET /api/:lat/:lon: Retrieves weather data based on latitude and longitude coordinates. It uses rate limiting, caching, and CORS configuration.

### Rate Limiting

The server includes rate limiting functionality to prevent abuse or excessive usage. By default, it allows a maximum of 6 requests per 10 minutes from the same IP address.

### Caching

The server utilizes [caching](https://wp-rocket.me/wordpress-cache/different-types-of-caching/) to improve performance. API responses are cached for 2 minutes using the Apicache middleware.

### CORS Configuration

[Cross-Origin Resource Sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is enabled to allow requests from specific origins. The server is configured to accept requests from `http://localhost:<port>` by default.

## References

- [How to hide your API keys SAFELY when using React](https://www.youtube.com/watch?v=FcwfjMebjTU)
- [Build an API Proxy Server - Hide Your API Keys, Rate Limiting & Caching](https://www.youtube.com/watch?v=ZGymN8aFsv4)
- [5 JavaScript API Key Mistakes (and how to fix them)](https://www.youtube.com/watch?v=7oJgdyMS4rQ)
- [How to Hide API Keys with Node JS | Hiding API Keys with dotenv Environment Variables](https://www.youtube.com/watch?v=uk9pviyvrtg)
- [How to Hide API Keys with Node JS - Environment Variables & .env](https://monsterlessons-academy.com/posts/how-to-hide-api-keys-with-node-js)