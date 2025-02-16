const mongo = require("mongoose");

const mongoURI = process.env.MONGO;

mongo
  .connect(mongoURI)
  .then(() => {
    console.log("Databse Connected Successfully");
  })
  .catch((err) => {
    console.log("Unable to connect with Databse");
  });
