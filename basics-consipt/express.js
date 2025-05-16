// Setting up a basic Express application
const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Middleware
// app.use(function (req, res, next) {
//   console.log("I'm a middleware Working");
//   next();
// });

// Routing
app.get("/", function (req, res) {
  res.send("Home: Hello World! I'm Abu Hammad");
});

app.get("/profile", function (req, res, next) {
  res.send("Profile: Haye Buddy!");
//   return next(new Error("Something went wrong!"));
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// start server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
