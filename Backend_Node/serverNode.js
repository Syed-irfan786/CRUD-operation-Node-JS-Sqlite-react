
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

app.use(bodyParser.json());



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
// console.log("Hello, World!");