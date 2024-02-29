# CRUD Application Using MySQL and ExpressJS

This is a simple CRUD (Create, Read, Update, Delete) application implemented using ExpressJS and MySQL. The application provides RESTful APIs to manage records in a table called `users`.

### Prerequisites

Make sure you have the following prerequisites installed on your computer:

*   [Node.js](https://nodejs.org/)
*   [MySQL Community Edition](https://dev.mysql.com/downloads/mysql/)

## Dependencies

The project requires the following dependencies:

- Express: A fast and minimalist web framework for Node.js. Version 4.18.2 is used in this project.
- mysql2: A modern, efficient, and promising MySQL client for Node.js. Version 3.2.3 is used in this project.
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
npm start
```

Now open <http://localhost:5000/> in browser to see it working. 

## API Documentation

| Method | URI | Request Body | Query Params | Response Status Code | Description |
|---|---|---|---|---|---|
| GET | / | None | None | 200 OK | Serves the `mysqlUseCases.html` homepage. |
| GET | /api/users | None | None | 200 OK | Fetches all users from the database. |
| GET | /api/users/:id | None | `id` (integer) | 200 OK | Fetches a specific user by their ID. |
| POST | /api/users | `name`, `surname`, `email` | None | 201 Created | Creates a new user with the given name, surname, and email. |
| PUT | /api/users | `userID`, `name`, `surname` | None | 200 OK | Updates a user with the given ID, setting their name and surname to the given values. |
| DELETE | /api/users/:id | None | `id` (integer) | 200 OK | Deletes a user with the given ID. |