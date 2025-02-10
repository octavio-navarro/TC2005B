"use strict";

import express from "express";
import mysql from "mysql2/promise";
import fs from "fs";

const app = express();
const port = 5000;

app.use(express.json());

// Since we are using the chart module installed from node js, we need to expose it so that the web page can use it.
app.use(express.static("./public"));

// This function will connect to the database and return the connection object.
async function connectToDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "hagen",
    password: "M4sqls3rv3r.",
    database: "api_game_db",
  });
}

// This is the route that will be used to load the page. It will read the html file and send it to the client.
// The client will then load the page and make the requests to the server.
app.get("/", (request, response) => {
  fs.readFile("./public/html/user_charts.html", "utf8", (err, html) => {
    if (err) response.status(500).send("There was an error: " + err);
    console.log("Loading page...");
    response.send(html);
  });
});

// This route will be used to get the data from the users table in the database.
app.get("/api/users", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    let [results, fields] = await connection.query("select * from users");

    console.log("Sending data correctly.");
    response.status(200);
    response.json(results);
  } catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("Connection closed succesfully!");
    }
  }
});

// This route will be used to get the data from the top_levels view in the database.
// That view returns the top 5 levels ordered by completion rate.
app.get("/api/levels", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(
      "select * from top_levels"
    );

    console.log("Sending data correctly.");
    response.status(200);
    response.json(results);
  } catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("Connection closed succesfully!");
    }
  }
});

app.get("/api/levels/:level_name", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [rows, columns] = await connection.execute(
      "select * from top_levels where name = ?",
      [request.params.level_name]
    );

    console.log(`Params: ${request.params.level_name}`);
    console.log("Sending data correctly.");
    response.status(200);
    response.json(rows);
  } catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("Connection closed succesfully!");
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
