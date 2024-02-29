 # Simple Express Server with Static Files and API Endpoints

This is a simple example of an Express server that serves static files and has several API endpoints. It uses Node.js built-in `fs` module to serve an HTML file at the root route ('/'). The other two API endpoints use query parameters and URL parameters respectively to send personalized greetings.

### Prerequisites

Make sure you have the following prerequisites installed on your computer:

*   [Node.js](https://nodejs.org/)

## Dependencies

The following packages are required to run this project:

* Express - A minimal and flexible Node.js web application framework. Version ^4.18.2 is currently being used in this project.

* Nodemon - Development server that watches for changes and restarts the server. Version ^2.0.22 is currently being used in this project.

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

Now open <http://localhost:3000/> in browser to see it working. You can also try out different api calls as described under usage section.

## Usage

Three API routes are defined in this project which can be tested using tools like postman or curl etc.

#### GET /

Serves the content of helloWorld.html present inside public folder. This can be used to test serving of static files through express.

#### GET /api/hello?name=<NAME>&surname=<SURNAME>

Returns a customised greeting message using name and surname provided as query params. If no values are passed then default value "Hello!" is returned. e.g.,
```bash
curl -X GET http://localhost:3000/api/hello\?name=John\&surname=Doe
```
will give output
```vbnet
Hello John Doe
```
#### GET /api/greeting/:name/:surname

Returns a customised greeting message using name and surname provided as url params. If no values are passed then default value "Hello!" is returned. e.g.,
```bash
curl -X GET http://localhost:3000/api/greeting/Jane/Smith
```
will give output
```vbnet
Hello Jane Smith
```