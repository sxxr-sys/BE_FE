import express from "express";
import fs from "node:fs"
import bodyParser from "body-parser";

const app = express();
// costom portoo asaah  4000 baij bolno
const port = 8000;

const data = [];

app.use(bodyParser.json())

app.get("/write", (req, res) => {
  data.push(Math.random() * 10);
  res.send("success");
  res.end()
});


app.get("/read", (req, res) => 
  res.send(data));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/// live server shig node mon gedg san suulgan

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
