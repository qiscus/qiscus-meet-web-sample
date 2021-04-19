const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "src")));

// Run server
const PORT = 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
