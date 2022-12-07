const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8082;

app.use(express.json());
app.use(cors());


// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err :any) {
      if (err) console.error(err);
   
    });
    console.log(`Server is running on port: ${port}`);
  });