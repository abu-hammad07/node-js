const express = require("express");
const app = express();
const path = require("path");

// setting up parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// setting up static files
app.use(express.static(path.join(__dirname, "public")));
// setting up EJS view engine -> render EJS pages
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

// Dynamic routing with parameters
app.get("/profile/:username", function(req, res){
    const username = req.params.username;
    res.send(`Welcome Your profile: ${username}`);
})

// Dynamic routing with parameters 
app.get("/profile/:username/:age", function(req, res){
    const username = req.params.username;
    const age = req.params.age;
    res.send(`Welcome Your profile: ${username} Age: ${age}`);
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
