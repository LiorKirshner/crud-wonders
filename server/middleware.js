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

module.exports = {
  loggingMiddleware,
  requestCounterMiddleware,
};
