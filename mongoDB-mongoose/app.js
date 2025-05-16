const express = require("express");
const app = express();
const Path = require("path");

// require the Model
const userModel = require("./models/user");

// session and flash for use of flash messages
const session = require("express-session");
const flash = require("connect-flash");

// setting up session
app.use(
  session({
    secret: "secret", // Session data ko encrypt karne ke liye ek secret key (string)
    resave: false, // Har request par session ko dobara save nahi karega (agar change nahi hua)
    saveUninitialized: false, // Jab tak session mein kuch store nahi hota, session create nahi hota
  })
);
app.use(flash()); // Flash messages ko enable karta hai (temporary messages ek request se doosri tak)

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, "public")));

// Routing with EJS => Render EJS index page
app.get("/", (req, res) => {
  try {
    res.render("index", { error: req.flash("error") });
  } catch (err) {
    req.flash("error", "Some thing went wrong");
    res.redirect("/");
  }
});

// Routing with EJS => Render EJS read page
app.get("/read", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("read", {
      users: users,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (err) {
    req.flash("error", "Some thing went wrong");
    res.redirect("/");
  }
});

// Routing with EJS => Render EJS create page
app.post("/create", async (req, res) => {
  try {
    let { name, email, image } = req.body;

    if (!name || !email || !image) {
      req.flash("error", "All fields are required");
      return res.redirect("/");
    }

    const user = await userModel.create({
      name,
      email,
      image,
    });
    req.flash("success", "User created successfully");
    res.redirect("/read");
  } catch (err) {
    console.log(err);
  }
});

// Routing with EJS => Render EJS edit page
app.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      req.flash("error", "User not found");
      res.redirect("/read");
    }
    res.render("edit", { user: user, error: req.flash("error") });
  } catch (err) {
    req.flash("error", "User not found");
    res.redirect("/read");
  }
});

// Routing with EJS => Render EJS update page
app.post("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { name, email, image } = req.body;

    if (!name || !email || !image) {
      req.flash("error", "All fields are required");
      res.redirect(`/edit/${id}`);
    }

    const userUpdate = await userModel.findOneAndUpdate(
      { _id: id },
      { name, email, image },
      { new: true }
    );
    req.flash("success", "User updated successfully");
    res.redirect("/read");
  } catch (err) {
    req.flash("error", "User not found");
    res.redirect("/read");
  }
});

// Routing with EJS => Render EJS delete page
app.get("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    req.flash("success", "User deleted successfully");
    res.redirect("/read");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
