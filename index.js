const express = require("express");
const app = express();
const http = require('http').createServer(app);


//get to send data on server and "/"is a location and then cretae a callback fn
app.get("/",function(request,response){
    response.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;
http.listen(port,() =>{
    console.log("Node JS Server is running on port 8080");
})