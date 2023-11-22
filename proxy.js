// const http = require('http');
// const httpProxy = require('http-proxy');

// // Create a proxy server instance
// const proxy = httpProxy.createProxyServer({});

// // Define the target URL of your backend server
// const backendUrl = 'http://localhost:3002';

// // Create an HTTP server that listens on a port (e.g., 19007)
// const server = http.createServer(function (req, res) {
//   // Set up proxy to forward the request to the backend
//   proxy.web(req, res, { target: backendUrl });
// });

// // Listen on port 19007 (or any other port you prefer)
// const port = 19007;
// server.listen(port, function () {
//   console.log(`Proxy server is listening on port ${port}`);
// });
