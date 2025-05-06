"use strict";

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const KFC = require("./models/kfc");

// Controllers
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const kfcController = require("./controllers/kfcController");

// Models
const Subscriber = require("./models/subscriber");
const { createKfcItem, findAllKfcItems } = require("./models/kfc");

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");

  // Optional: Create a sample KFC item
  createKfcItem({ name: "Streetwise Two", price: 49.99, spicy: false })
    .then(item => console.log("🍗 KFC item created:", item))
    .catch(err => console.error("❌ Error creating KFC item:", err));

  // Optional: Log all items
  findAllKfcItems()
    .then(items => console.log("📋 All KFC items:", items))
    .catch(err => console.error("❌ Error fetching KFC items:", err));
});

// Sample subscriber query
Subscriber.find({ name: "Leotha Gradwell" }).exec()
  .then(docs => console.log("🔍 Found subscriber(s):", docs))
  .catch(err => console.error("❌ Error finding subscriber:", err));

// App Configuration
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

// Routes
app.get("/", homeController.index); // views/index.ejs
app.get("/courses", homeController.showCourses); // views/courses.ejs

// KFC Menu Page
app.get("/kfc", kfcController.getAllKfcItems); // views/kfc.ejs

// Subscriber Pages
app.get("/subscribers", subscriberController.getAllSubscribers, (req, res) => {
  res.render("subscribers", { subscribers: req.data });
});
app.get("/contact", subscriberController.getSubscriptionPage);
app.post("/subscribe", subscriberController.saveSubscriber);

// Error Handling
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// Start Server
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});

const pop =new KFC({
  name: "KFC Sandton City",
  branchLocation: "Johannesburg",
  rating: 4.8
})
console.log(pop)
