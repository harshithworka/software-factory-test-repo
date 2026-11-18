const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple HTTP server to serve the calculator
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/calculator.html') {
        fs.readFile(path.join(__dirname, 'calculator.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading calculator.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = 8888;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Calculator is ready for testing!');
    console.log('\nTest cases to verify:');
    console.log('1. Basic addition: 5 + 3 = 8');
    console.log('2. Subtraction: 10 - 4 = 6');
    console.log('3. Multiplication: 6 × 7 = 42');
    console.log('4. Division: 20 / 5 = 4');
    console.log('5. Decimal operations: 3.5 + 2.5 = 6');
    console.log('6. Clear button (C) resets to 0');
    console.log('7. Backspace (←) deletes last digit');
    console.log('8. Division by zero shows Error');
    console.log('\nPress Ctrl+C to stop the server');
});
