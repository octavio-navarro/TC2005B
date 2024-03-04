 # Express API Server

This is an simple Express server with various routes and methods implemented. It uses the built-in JSON parser middleware to parse incoming requests with JSON data.

## Routing

Routing in web applications defines how HTTP requests should be handled based upon their URL paths and HTTP verb types (e.g., GET, POST). Each path corresponds to a unique handler function called _route handlers_. Route handling involves receiving incoming HTTP requests, processing necessary logic, extracting any relevant information, sending responses back to clients, or even passing control flow onto other functions (middleware) before responding.

Express provides easy-to-implement routing capabilities through intuitive APIs. For instance, consider the following example which sets up three different route handlers bound to separate HTTP verbs:

```javascript
app.get('/example', (request, response) => { /* ... */ }); // Handles GET request to '/example'
app.post('/example', (request, response) => { /* ... */ }); // Handles POST request to '/example'
app.put('/example', (request, response) => { /* ... */ }); // Handles PUT request to '/example'
```

In our provided implementation, there exist several customized route configurations utilizing diverse HTTP verb combinations along with various optional features including route parameters and query strings. These allow us to create more flexible endpoints capable of supporting complex operations.

## Middleware

Middleware are software components placed between two layers within a system architecture to perform specific tasks. They help decouple core functionalities from auxiliary responsibilities providing better separation of concerns. Often used for logging purposes, error handling, parsing input formats, authentication checks, etc.

Express supports third-party plugins extending its functionality via middleware functions. Built-in middleware examples include static asset serving, cookie management, session handling, CSRF protection, body parsing, compression, among others. One example is one such middleware responsible for parsing JSON payloads present in incoming requests:

```javascript
app.use(express.json());
```
### Prerequisites

Make sure you have the following prerequisites installed on your computer:

*   [Node.js](https://nodejs.org/)

## Dependencies

The project requires the following dependencies:

- Express: A fast and minimalist web framework for Node.js. Version 4.18.2 is used in this project.
- Nodemon: A utility that monitors for changes in your source code and automatically restarts the server.

To install these packages, run the following command in your terminal:

```bash
$ npm install
```
It is important to mention that nodemon has to be installed as a global package:

```bash
$ npm install -g nodemon
```

### Running the application

Run the application using any one of the commands given below:

```bash
$ npm dev
```
Now open <http://localhost:3000/> in browser to see it working. 


## Table of Endpoints

| Method | URI                         | Request Body   | Query Params | Response Status Code | Description               |
|--------|-----------------------------|---------------|--------------|----------------------|---------------------------|
| GET    | /                           | None          | None         | 200 OK               | Root route                 |
| POST   | /                           | None          | None         | 200 OK               | Post request              |
| PUT    | /                           | None          | None         | 200 OK               | Put request               |
| DELETE | /                           | None          | None         | 200 OK               | Delete request            |
| GET    | /users/:id                  | None          | :id          | 200 OK               | Get user by ID             |
| GET    | /products/:category/:id     | None          | :category, :id | 200 OK        | Get product by category and ID      |
| POST   | /users/:id                  | None          | :id          | 200 OK               | Post request for specific user by ID |
| PUT    | /products/:category/:id     | None          | :category, :id | 200 OK       | Put request for specific product by category and ID |
| DELETE | /users/:id                  | None          | :id          | 200 OK               | Delete request for specific user by ID |
| GET    | /api/users                 | None          | None         | 200 OK               | Get list of users         |
| POST   | /api/users                 | User object    | None         | 201 Created        | Create new user           |

Note: In this table, `None` indicates no value required, while `:id` or `:category` represents dynamic values passed as URL parameters. A `User object` refers to a JSON object containing properties such as `{ "id": integer, "name": string }`.