// Logging middleware that prints: [TIMESTAMP] METHOD URL
const loggingMiddleware = function (req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Request counter middleware that adds requestCount property to req
let totalRequests = 0;
const requestCounterMiddleware = function (req, res, next) {
  totalRequests++;
  req.requestCount = totalRequests;
  next();
};

// Route handlers
const homeRoute = function (req, res) {
  res.send(`Welcome to CRUD Wonders! This is request #${req.requestCount}`);
};

const aboutRoute = function (req, res) {
  res.send(
    `About CRUD Wonders: A simple Express app for learning CRUD operations. This is request #${req.requestCount}`
  );
};

// Test data for users
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// Route-specific middleware functions
const validateId = function (req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    const error = new Error("Invalid ID format");
    error.status = 400;
    return next(error);
  }
  req.userId = id;
  next();
};

const checkResourceExists = function (req, res, next) {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    return next(error);
  }
  req.user = user;
  next();
};

// Error handling middleware
const errorHandler = function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(`Error ${status}: ${message}`);
  res.status(status).send({ error: message });
};

// User route handlers
const getAllUsers = function (req, res) {
  res.send(users);
};

const getUserById = function (req, res) {
  res.send(req.user);
};

const createUser = function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: "Name is required" });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).send(newUser);
};

module.exports = {
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
};
