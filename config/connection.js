const { connect, connection } = require("mongoose");

const connectionString = "mongodb://localhost:27017/social-api";

connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = connection;
