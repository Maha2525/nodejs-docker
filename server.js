const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// Function to serve files
function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Create server
http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './public/index.html';

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Set the content type based on file extension
  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
  }

  serveFile(filePath, contentType, res);
}).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
