const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');//extract the value n save its to variable
const { request, response } = require('express');
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

app.post("/api/user/create",(request, response) => {
    const firstname = request.body.first_name;
    const lastname = request.body.last_name;
    const email = request.body.email;
    const contactNumber = request.body.contact_number;

    const query = `INSERT INTO user_information (first_name, last_name, email, contact_number) VALUES ('${firstname}', '${lastname}', '${email}', '${contactNumber}')`;

    connection.query(query,(error, result) => {
        if(error){
            response.status(500).send(error);
            return;
        }

        response.status(200).send({
            result : result,
            message: "Successfully User Profile has been created"
        })
    });
});

app.put("/api/user/edit/:id", (request, response) => {
    let id = request.params.id;
  
    const firstName = request.body.first_name;
    const lastName = request.body.last_name;
    const email = request.body.email;
    const contactNumber = request.body.contact_number;
  
    const query = `UPDATE user_information SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', contact_number = ${contactNumber} WHERE id = ${id}`;
  
    connection.query(query, (error, result) => {
      if(error){
        response.status(500).send(error);
        return;
      }
  
      response.status(200).send({
        result : result,
        message : "Updated the user profile successfully"
      })
    });
  });

  app.delete("/api/user/delete/:id", (request, response) => {
    const id = request.params.id;
  
    const query = `DELETE FROM user_information WHERE id = ${id}`;
  
    connection.query(query, (error, result) => {
      if(error){
        response.status(500).send(error);
        return;
      }
  
      response.status(200).send({
        result : result,
        message : "Successfully deteled a user profile"
      })
    });
  });

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log("Node JS Server is running on port 8080")
})