const express = require("express");
const app = express();

const userModel = require("./usermodel.js");

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.get("/create", async (req, res) => {
  try {
    const user = await userModel.create({
      name: "Anus",
      username: "anus",
      email: "hZi9o@example.com",
      password: "123456",
    });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.get('/read', async (req, res) => {
    try {
        // two types off find method 1) find 2) findOne
        const users = await userModel.find();
        // const users = await userModel.find({username: "AbuHammad"});
        res.send(users);
    } catch (err){
        console.log(err);
    }
})

app.get("/update", async (req, res) => {
  try {
    const userUpdate = await userModel.findOneAndUpdate(
      {username: "AbuHammad"},
      {name: "Muhammad Abu Hammad, Kamal Ahmed"},
      {new: true}
    );
    res.send(userUpdate);
  } catch (err) {
    console.log(err);
  }
});




app.get('/delete', async (req, res) => {
    try{
        const userDelete = await userModel.findOneAndDelete({username: "AbuHammad"});
        res.send(userDelete);
    } catch (err){
        console.log(err);
    }
})





// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
