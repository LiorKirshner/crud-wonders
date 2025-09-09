const express = require("express");
const router = express.Router();

const wonders = [
  { name: "Mount Everest", location: "Nepal", visited: false },
  { name: "Grand Canyon", location: "Arizona", visited: false },
  { name: "Botanical Gardens", location: "Singapore", visited: true },
  { name: "Pantheon", location: "Greece", visited: false },
  { name: "Colosseum", location: "Italy", visited: true },
];

router.get("/wonders", function (req, res) {
  res.send(wonders);
});

router.post("/wonder", function (req, res) {
  console.log("Someone's trying to make a post request");
  const newWonder = req.body;
  if (!newWonder || !newWonder.name || !newWonder.location) {
    return res.status(400).send({ error: "Missing wonder data" });
  }
  newWonder.visited = false;
  wonders.push(newWonder);
  res.send("completed adding wonder");
});

router.put("/wonder/:name", function (req, res) {
  console.log("About to update someone");

  let wonderName = req.params.name;
  console.log("PUT /wonder/:name called with:", wonderName);
  let wonder = wonders.find((w) => w.name === wonderName);
  if (!wonder) {
    return res.status(404).send({ error: "Wonder not found" });
  }
  wonder.visited = true;
  res.send(wonder);
});

router.delete("/wonder/:name", function (req, res) {
  let wonder = req.params.name;
  let wondersIndex = wonders.findIndex((w) => w.name === wonder);
  wonders.splice(wondersIndex, 1);
  res.end();
});

module.exports = router;
