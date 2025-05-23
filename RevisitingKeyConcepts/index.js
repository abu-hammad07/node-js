const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", {files: files});
  });
});

app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("-")}.txt`, req.body.details, function(err){
        if(err) console.log(err);
        else res.redirect("/");
    })
})

app.get("/edit/:file", function(req, res){
    res.render("edit", {fileName: req.params.file});
})

app.post("/update/:file", function(req, res){
    fs.rename(`./files/${req.params.file}`, `./files/${req.body.newName.split(" ").join("-")}.txt`, function(err){
        if(err) console.log(err);
        else res.redirect("/");
    })
})

app.get("/file/:file", function(req, res){
    fs.readFile(`./files/${req.params.file}`, 'utf-8', function(err, data){
        res.render("show", {file: req.params.file, data: data});
    })
})



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
