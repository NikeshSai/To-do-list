const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

let items =["Buy Food", "Cook Food", "Eat Food"];

let workItems = [];

app.set('view engine', 'ejs');

app.get("/", function (req, res){

    let today = new Date();
    let options ={
      weekday : "long",
      day : "numeric",
      month : "long"
    };
    let day = today.toLocaleDateString ("en-US", options);

    res.render("list",{listTitle: day, newListItems : items});


});
app.post("/", function(req, res){

  let item = req.body.newItem;
  if(req.body.list==="work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }


})

app.get("/work", function(req, res){
  res.render("list", {listTitle :"work List", newListItems : workItems});

})

app.post("/work", function(req, res){
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(req, res){

  console.log("Server started at port 3000");
})
