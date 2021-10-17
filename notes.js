const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');//extract the value n save its to variable
const app = express();
// in server js a entry file
const http = require('http').createServer(app);
// const cors = require('cors');

app.use(bodyParser.json());
app.use(express.json());
// app.use(cors({
//     credentials : true,
//     origin : "*"
// }));

//create database connection
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "vshesh"

});  

connection.connect((error) => {
    if(error){
        throw error;
        return;
    }

    console.log("MYSQL database is connected");
});

app.get("/api/user/list", (request, response) => {
    const query = `select * from user_information`;

    connection.query(query, (error, result) => {
        if(error){
            response.status(500).send(error);
            return;
        }

        response.status(200).send(result);
    });
});

// app.put("/api/user/edit/:id", (request, response) => {
  

// });


// app.delete("/api/user/delete/:id", (request, response) => {
//   const id = request.params.id;
//   const query = `Delete from  user_information where id = ${id}`;
//   connection.query(query, (error, result) => {
//         if(error){
//             response.status(500).send(error);
//             return;
//         }

//         response.status(200).send(result);
//     });
// });


const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log("Node JS Server is running on port 8080")
})