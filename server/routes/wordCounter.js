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

// GET /word - returns count for word from query parameter
router.get("/word", function (req, res) {
  const word = req.query.word;
  if (!word) {
    return res.status(400).send({ error: "Missing word parameter" });
  }
  const count = wordCounter[word] || 0;
  res.send({ count });
});

// POST /word - adds word to counter and returns response
router.post("/word", function (req, res) {
  const word = req.body.word || req.query.word;
  if (!word) {
    return res.status(400).send({ error: "Missing word" });
  }

  // Add word with count 1 if it doesn't exist, or increment if it does
  if (wordCounter[word]) {
    wordCounter[word] += 1;
  } else {
    wordCounter[word] = 1;
  }

  res.send({
    text: `Added ${word}`,
    currentCount: wordCounter[word],
  });
});

// POST /sentence - adds all words from sentence to counter
router.post("/sentence", function (req, res) {
  const sentence = req.body.sentence || req.query.sentence;
  if (!sentence) {
    return res.status(400).send({ error: "Missing sentence" });
  }

  // Split sentence into words and clean them
  const words = sentence
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  let numNewWords = 0;
  let numOldWords = 0;

  words.forEach((word) => {
    if (wordCounter[word]) {
      // Word already exists
      numOldWords++;
      wordCounter[word] += 1;
    } else {
      // New word
      numNewWords++;
      wordCounter[word] = 1;
    }
  });

  res.send({
    text: `Added ${numNewWords} words, ${numOldWords} already existed`,
    currentCount: -1,
  });
});

module.exports = router;

// GET /word - returns count for word from query parameter
router.get("/word", function (req, res) {
  const word = req.query.word;
  if (!word) {
    return res.status(400).send({ error: "Missing word parameter" });
  }
  const count = wordCounter[word] || 0;
  res.send({ count });
});

// POST /word - adds word to counter and returns response
router.post("/word", function (req, res) {
  const word = req.body.word || req.query.word;
  if (!word) {
    return res.status(400).send({ error: "Missing word" });
  }

  // Add word with count 1 if it doesn't exist, or increment if it does
  if (wordCounter[word]) {
    wordCounter[word] += 1;
  } else {
    wordCounter[word] = 1;
  }

  res.send({
    text: `Added ${word}`,
    currentCount: wordCounter[word],
  });
});

module.exports = router;
