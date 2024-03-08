"use strict";

// Importing modules
import express from "express";

import mysql from "mysql2/promise";

const app = express();
const port = 5000;

app.use(express.json());

// Function to connect to the MySQL database
async function connectToDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "hagen",
    password: "M4sqls3rv3r.",
    database: "cards_db",
  });
}

// Routes definition and handling
app.get("/api/cards", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();
    const [results, fields] = await connection.execute("select * from card");

    console.log(`${results.length} rows returned`);
    console.log(results);
    response.status(200).json(results);
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

app.get("/api/cards/:id", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();
    const [results, fields] = await connection.execute(
      "select * from card where card_id = ?",
      [request.params.id]
    );

    console.log(`${results.length} rows returned`);
    console.log(results);
    response.status(200).json(results);
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

app.post("/api/cards", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const data = request.body instanceof Array ? request.body : [request.body];

    for (const card of data) {
      const [results, fields] = await connection.execute(
        "insert into card (card_name, card_description, card_type, card_cost, card_rarity, card_target) values (?, ?, ?, ?, ?, ?)",
        [
          card.card_name,
          card.card_description,
          card.card_type,
          card.card_cost,
          card.card_rarity,
          card.card_target,
        ]
      );
      console.log(`${results.affectedRows} rows affected`);
      console.log(results);
    }

    response.status(200).json({ message: "Cards added successfully" });
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

app.put("/api/cards/:id", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const data = request.body;

    const [results, fields] = await connection.execute(
      "update card set card_name=?, card_description=?, card_type=?, card_cost=?, card_rarity=?, card_target=? where card_id=?",
      [
        data.card_name,
        data.card_description,
        data.card_type,
        data.card_cost,
        data.card_rarity,
        data.card_target,
        request.params.id,
      ]
    );

    console.log(`${results.affectedRows} rows affected`);
    console.log(results);
    response.status(200).json({ message: "Card updated successfully" });
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

app.delete("/api/cards/:id", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.execute(
      "delete from card where card_id = ?",
      [request.params.id]
    );

    console.log(`${results.affectedRows} rows affected`);
    console.log(results);
    response.status(200).json({
      message: `Data deleted correctly: ${results.affectedRows} rows deleted.`,
    });
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
  console.log(`Server running on port ${port}`);
});
