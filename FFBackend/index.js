const express = require("express")
const { connection } = require("./config/db");
const { user} = require("./routes/User.routes");
const cors=require('cors');
const app = express();
require("dotenv").config();
app.use(cors());

app.use(express.json());

app.use("/users", user);

app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected to db");
    } catch (err) {
      console.log(err);
      console.log("Error connecting in database");
    }
  
    console.log(`Server is running at port ${process.env.port}`);
  });
  