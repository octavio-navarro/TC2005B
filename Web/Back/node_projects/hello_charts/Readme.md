 # Charts using Chart.js 

This is a web application that uses Chart.js to create interactive charts. The application consists of an HTML file that serves as the user interface and a Node.js application that provides API endpoints to retrieve data for the charts.

## HTML Structure

The HTML file is divided into several sections:

- **Header**: Contains the title of the page and a brief introduction to Chart.js.
- **Installation**: Provides information on how to install Chart.js and links to the official documentation.
- **Creating a Chart**: Explains the basic steps to create a chart using Chart.js, including selecting a canvas element and creating a configuration object.
- **Getting data from an API**: Describes how to retrieve data from an API and process it to create arrays that can be used to plot a chart.

## JavaScript Code

The JavaScript code is located in the `user_charts.js` file and is responsible for:

- Retrieving data from the API endpoints
- Processing the data to create arrays that can be used to plot the charts
- Creating the charts using Chart.js

## Charts

The application includes four charts:

- **First Chart**: A basic chart that demonstrates how to create a chart using Chart.js.
- **API Chars**: Three charts that plot the completion rate of each level in the 'levels' table. Each table plots the data differently to showcase the available chart types.

### Prerequisites

Make sure you have the following prerequisites installed on your computer:

- [Node.js](https://nodejs.org/)
- The application assumes you have already created the database from the [api_game_db.sql](../../files/api_game_db.sql) file.

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
$ npm start
```
Now open <http://localhost:5000/> in browser to see it working. 


## Table of Endpoints

| Method | URI                         | Request Body   | Query Params | Response Status Code | Description               |
|--------|-----------------------------|----------------|--------------|----------------------|---------------------------|
| GET    | /                           | -              | -            | 200                  | Serve the HTML file       |
| GET    | /api/users                  | -              | -            | 200                  | Retrieve all user data    |
| GET    | /api/levels                 | -              | -            | 200                  | Retrieve top 5 levels     |
| GET    | /api/levels/:level_name     | -              | -            | 200                  | Retrieve specific level data|

