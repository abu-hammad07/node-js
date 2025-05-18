const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "1q2w3e4r";
const someOtherPlaintextPassword = "not_bacon";

// jsonwebtoken
const jwt = require("jsonwebtoken");

// cookie parser
app.use(cookieParser());

// store jwt
app.get("/store-jwt", (req, res) => {
  const token = jwt.sign({ email: "info@hammadkamal.com" }, "secret");
  res.cookie("token", token);
  res.send("Token set");
});

// verify jwt
app.get("/verify-jwt", (req, res) => {
  const token = req.cookies.token;
  // const verify = jwt.verify(token, "hammad");
  // if(verify){
  //     res.send(`Welcome ${jwt.decode(token).email}`);
  // }else{
  //     res.send("Invalid token");
  // }
  jwt.verify(token, "secret", (err, decode) => {
    if (err) {
      res.send("Invalid token");
    } else {
      res.send(`Welcome: ${decode.email}`);
    }
  });
});

// bcrypt hash password
app.get("/user", (req, res) => {
  //   bcrypt.genSalt(saltRounds, function (err, salt) {
  //     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
  //       console.log(hash);
  //     });
  //   });

  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log(hash);
    res.cookie("username", "abuhammad");
    res.cookie("password", hash);
    res.send("Username & Password set");
  });
});

// bcrypt compare hash password
app.get("/check-user", async (req, res) => {
  const username = "abuhammad";
  const password = "1q2w3e4r";

  const cookie_username = req.cookies.username;
  const cookie_password = req.cookies.password;

  const match = await bcrypt.compare(password, cookie_password);

  if (username === cookie_username && match) {
    res.cookie("logged_in", true);
    res.send(
      `You are logged in, Username: ${cookie_username}, Password: ${match}`
    );
  } else {
    res.cookie("logged_in", false);
    res.send(
      `You are not logged in, Username: ${username}, Password: ${match}`
    );
  }
});

// cookie set
app.get("/cookie", (req, res) => {
  res.cookie("username", "AbuHammad");
  res.send("Cookie set");
});

// cookie read
app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("Read Cookie");
});

// cookie clear
app.get("/clear", (req, res) => {
  res.clearCookie(req.cookies.username);
  res.send("cookie cleared");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
