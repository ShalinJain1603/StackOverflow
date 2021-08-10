const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const dbUrl = "mongodb://localhost:27017/stackoverflow";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection Open");
  })
  .catch((err) => {
    console.log("Error occured");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running at port ${port}`);
});
