import express from "express";
import fs from "node:fs";
import bodyParser from "body-parser";
import { db } from "./db.js";

const app = express();
// costom portoo asaah  4000 baij bolno
const port = 8000;

const data = [];

app.use(bodyParser.json());

app.get("/write", (req, res) => {
  data.push(Math.random() * 10);
  res.send("success");
  res.end();
});

app.get("/read", (req, res) => res.send(data));

app.get("/InstallExtension", async (req, res) => {
  const tableQueryText = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  try {
    db.query(tableQueryText);
    res.send("Yeah success ");
  } catch (error) {
    res.send(error.message);
  }
  db.query(tableQueryText);
  res.send("success");
});

app.get("/TableCreated", async (req, res) => {
  // const tableQueryText = `
  // CREATE TABLE IF NOT EXISTS "users" (
  //   name VARCHAR(255) NOT NULL,
  //   email VARCHAR(255) UNIQUE
  // )`;

  const tableQueryText = `
  CREATE TABLE "users" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_img BYTEA,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    currency_type VARCHAR(50)
  )`;

  try {
    await db.query(tableQueryText);
  } catch (error) {
    console.error(error);
  }
  res.send("Table created successfully :)))))))))");
});

app.post("/users/create", async (req, res) => {
  const { email, name, password, avatar_img, currency_type } = req.body;
  const queryText = `INSERT INTO users (email, name, password, avatar_img, currency_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  try {
    const result = await db.query(queryText, [
      email,
      name,
      password,
      avatar_img,
      currency_type
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" })
  }
});

app.get("/createUser", async (req, res) => {
  const queryText = `
  SELECT * FROM Users
  `;
  try {
    const users = await db.query(queryText);
    // await db.query(queryText);
  } catch (error) {
    console.error(error);
  }
  res.send("User inserted succesfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/// live server shig node mon gedg san suulgan

// fs.readFile("/Users/joe/test.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });
