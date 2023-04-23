const express = require("express");
const app = express();
const path = require("path");

// Set up the EJS view engine
app.set("view engine", "ejs");

// Include the provided function
const findTopFilmsWithPosition_commented = require("./findTopFilms");
const filmLists = require("./filmLists");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { filmLists });
});

app.post("/get-top-films", (req, res) => {
  try {
    const filmLists = req.body.filmLists;
    const scores = findTopFilmsWithPosition_commented(filmLists);
    res.json(Array.from(scores.entries()));
  } catch (error) {
    res.status(400).send("Invalid data format");
  }
});

const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Film ranking app listening on port ${port}`);
});

//test
