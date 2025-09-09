const express = require("express");
const router = express.Router();

// Word counter object
const wordCounter = { hello: 2, world: 5, javascript: 3 };

// GET /word/:word - returns count for the word
router.get("/word/:word", function (req, res) {
  const word = req.params.word;
  const count = wordCounter[word] || 0;
  res.send({ count });
});

module.exports = router;
