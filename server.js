const express = require("express");
const path = require("path");
const api = require("./server/routes/api");
const {
  loggingMiddleware,
  requestCounterMiddleware,
  homeRoute,
  aboutRoute,
  validateId,
  checkResourceExists,
  errorHandler,
  getAllUsers,
  getUserById,
  createUser,
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

// GET / - Returns welcome message and current request count
app.get("/", homeRoute);

// GET /about - Returns about message and current request count
app.get("/about", aboutRoute);

app.get("/sanity", function (req, res) {
  res.send(`server is up and running - Request #${req.requestCount}`);
});

// User routes with middleware
app.get("/users", getAllUsers);
app.get("/users/:id", validateId, checkResourceExists, getUserById);
app.post("/users", createUser);

// Error handling middleware (must be last)
app.use(errorHandler);

const port = 1337; //because why not
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
