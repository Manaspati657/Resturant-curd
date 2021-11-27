const bodyParser = require('body-parser');
const express = require('express');
require("dotenv").config();
const app =express();
const port =process.env.PORT || 8200;
const cors=require('cors')

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())
// var db=require('./connectionstring');

var corsOptions = {
    //  origin: "https://sigeko.ajatus.co.in",
     origin: "*"
  };
  
app.use(cors(corsOptions));

require("./src/routes/resto.route")(app);
require("./src/routes/user.route")(app);

app.listen(port,()=>{
    console.log("server started on port 8200");
})

module.exports =app;