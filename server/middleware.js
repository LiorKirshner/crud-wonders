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
  res.send(`About CRUD Wonders: A simple Express app for learning CRUD operations. This is request #${req.requestCount}`);
};

module.exports = {
  loggingMiddleware,
  requestCounterMiddleware,
  homeRoute,
  aboutRoute,
};
