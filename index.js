// app.js or index.js
const express = require("express");
const requestIp = require("request-ip");
const app = express();
const port = 3000; // Choose any port you like

// Trust the proxy
app.set("trust proxy", true);

app.use(requestIp.mw());

// Middleware to log user information
app.use((req, _, next) => {
  // Get user IP address (IPv4 or IPv6)
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Get user agent
  const userAgent = req.headers["user-agent"];

  // Log user information
  console.log(`IP Address: ${ip}`);
  console.log(`User Agent: ${userAgent}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log("----------------------------------------");

  // Proceed to the next middleware/route handler
  next();
});

// Route to get client's IP address
app.get("/myip", (req, res) => {
  const clientIp = req.ip;
  console.log(clientIp);
  res.send(`Your IP address is ${clientIp}`);
});

// Define a route
app.get("/", (_, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
