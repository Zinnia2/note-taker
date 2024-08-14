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

function getFileContent(filePath, handler) {
    fs.readFile(filePath, (err, content) => {
        if(!err) { 
            handler(content);
        }
    })
}

function getRequestedFileContentAndContentTypeFromURL(url, handler){
    if (url === "/"){
            
        getFileContent("index.html", (data) => {
            handler({
                "content_type": "text/html",
                "content": data
            })
        });

    } else if (url === "/index_client.css") {

        getFileContent("index_client.css", (data) => {
            handler({
                "content_type": "text/css",
                "content": data
            })
        });
    } else if (url === "/index_client.js") {
        getFileContent("index_client.js", (data) => {
            handler({
                "content_type": "application/javascript",
                "content": data
            })
        });
        
    };
}

const server = http.createServer(
    (request, response) => {
        if(request.url === "/signup" && request.method === "POST") {
            let body = "";
            request.on("data", data => {
                body = body + data.toString();
            })
            request.on("end", () => {
                try {
                    console.log(JSON.parse(body))
                    response.writeHead(200, {"content_type": "application/json"})
                    response.end(JSON.stringify({ message: 'User successfully registered' }))
                } catch (error) {
                    console.log("Error parsing JSON")
                    console.log(error)
                    response.writeHead(400, {"content_type": "application/json"})
                    response.end(JSON.stringify({ message: 'Error in data' }))
                }
                
            })

        } else if(request.url === "/signin" && request.method === "POST") {

        } else {

            getRequestedFileContentAndContentTypeFromURL(request.url, (contentAndContentType) => {
                response.writeHead(200, {"content_type":contentAndContentType.content_type});
                response.end(contentAndContentType.content);
            })
        }
    }
);

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});