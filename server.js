const express = require("express");
const path = require("path");
const api = require("./server/routes/api");
const {
  loggingMiddleware,
  requestCounterMiddleware,
} = require("./server/middleware");
const app = express();
const wordCounter = require("./server/routes/wordCounter");

// Apply custom middleware to all routes
app.use(loggingMiddleware);
app.use(requestCounterMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);
app.use("/word", wordCounter);
app.get("/sanity", function (req, res) {
  res.send(`server is up and running - Request #${req.requestCount}`);
});

const port = 1337; //because why not
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
