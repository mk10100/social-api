const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const seedUsers = require("./utils/seeds");
const User = require("./models/user");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

db.once("open", async () => {
  // try {
  //   await User.deleteMany();
  //   await User.insertMany(seedUsers);
  //   console.log('Users seeded successfully');
  // } catch (error) {
  //   console.error('Error seeding users:', error);
  // }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
