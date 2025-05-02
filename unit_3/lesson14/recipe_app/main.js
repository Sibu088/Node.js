"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Recipe = require("./models/recipe");

//connecting to database
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");

});

//CREATING DOCUMENTS TO SAVE TO DB
//promises
Subscriber.create({
  name: "Sibusiso Makhiwane",
  email: "Sibusiomakhiwane61@gmail.com"
})
  .then((savedDoc) => {
    console.log(savedDoc);
  })
  .catch((err) => {
    console.log(err);
  });

const query = Subscriber.find({ name: "Jada Mathele" }).exec();
query
  .then(docs => {
    console.log(docs); // Handle the results
  })
  .catch(err => {
    console.error(err); // Handle errors
  });

  const newRecipe = new Recipe({
    title: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Black Pepper"],
    preparationTime: 20,
    difficulty: "Medium",
    instructions: "Boil pasta. Cook pancetta. Mix eggs and cheese. Combine all with pepper."
  });
  
  newRecipe.save()
    .then(doc => {
      console.log("Recipe saved:", doc);
    })
    .catch(err => {
      console.error("Error saving recipe:", err);
    });
  

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
