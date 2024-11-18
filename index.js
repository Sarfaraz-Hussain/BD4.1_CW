const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 3010;

let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite')
app.use(cors);
app.use(express.json());


let db;
(async () => {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
})();

// ===========================================================
async function fetchAllMovies(){
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return {movies: response};
}
app.get('/movies', async (req, res) => {
  let results = await fetchAllMovies();
  res.status(200).json(results);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
