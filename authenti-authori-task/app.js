const express = require("express");
const app = express();
const userModel = require("./models/user");

const cookieParser = require("cookie-parser");
const path = require("path");

const session = require("express-session");
const flash = require("connect-flash");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("profile", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
});


app.get("/profile", async (req, res) => {

    try{

        // check the token exists & logged in true
        if(!req.cookies.token || !req.cookies.logged_in){
            req.flash("error", "You are not logged in please login first");
            return res.redirect("/signin");
        }

        // check the token is valid
        const token = req.cookies.token;
        const verifyToken = jwt.verify(token, "secret1q2w3e4r");
        if(!verifyToken){
            req.flash("error", "Token is not verified please login first");
            return res.redirect("/signin");
        }

        // check the user exists
        const user_details = await userModel.findOne({ email: verifyToken.email});
        if(!user_details){
            req.flash("error", "User not found");
            return res.redirect("/signin");
        }
        
        res.render("profile", {
            success: req.flash("success"),
            error: req.flash("error"),
            user_details,
        });

    } catch(err){
        req.flash("error", "Something went wrong");
        res.redirect("/profile");
    }

});



app.get("/signup", (req, res) => {
  res.render("signup", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
});

app.post("/signup", async (req, res) => {
  try {

    // check if all fields are filled
    if (
      !req.body.name ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password
    ) {
      req.flash("error", "All fields are required");
      res.redirect("/signup");
      return;
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email});
    if(existingUser){
        req.flash("error", "User already exists");
        res.redirect("/signup");
        return;
    }

    // hash password
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const password_hash = hash;

    // generate token
    const token = jwt.sign({email: req.body.email}, "secret1q2w3e4r");

    // create user
    const user = await userModel.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: password_hash,
      token: token,
    });

    if (user) {
      res.cookie("token", token);
      res.cookie("logged_in", true);
      res.redirect("/profile");
    } else {
      req.flash("error", "User not created");
      res.redirect("/signup");
    }

  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/signup");
  }
});

app.get("/signin", (req, res) => {
  res.render("signin", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
});


app.get("/logout", async (req, res) => {
    try{
        res.clearCookie("token");
        res.clearCookie("logged_in");
        res.flash("success", "Logged out successfully");
        res.redirect("signin");
    } catch(err){
        req.flash("error", "Something went wrong");
        res.redirect("/profile");
    }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
