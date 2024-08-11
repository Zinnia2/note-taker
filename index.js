// // Import the mysql2 package
// const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost', // Replace with your MySQL server host
//   user: 'root',      // Replace with your MySQL username
//   password: '12345678',  // Replace with your MySQL password
//   database: 'note_taker_db' // Replace with your database name
// });

// // Connect to the MySQL server
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the database as id', connection.threadId);
// });

const http = require("http");
const fs = require("fs");


const server = http.createServer(
    (request, response) => {
        fs.readFile("index.html", (err, content) => {
            if(err){
                console.log("Error");
            } else {
                response.writeHead(200, {"content-type":"text/html"});
                response.end(content);           
            }
        })
    }
);

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});