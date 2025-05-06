

const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const express = require("express");
const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");

});

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

const subscribers = [
  { name: "David", email: "tom@email.com", zipCode: 12345 },
  { name: "Sibu", email: "bob@email.com", zipCode: 12345 },
  { name: "Cathy", email: "cathy@email.com", zipCode: 12345 },
  { name: "David", email: "david@email.com", zipCode: 12345 },
  { name: "Ella", email: "ella@email.com", zipCode: 12345 },
  { name: "Frank", email: "frank@email.com", zipCode: 54321 },
  { name: "Grace", email: "grace@email.com", zipCode: 23456 },
  { name: "Henry", email: "henry@email.com", zipCode: 34567 },
  { name: "Isabel", email: "isabel@email.com", zipCode: 45678 },
  { name: "James", email: "james@email.com", zipCode: 56789 }
];

Subscriber.insertMany(subscribers)
  .then(result => {
    console.log("Subscribers added successfully:");
    result.forEach(sub => console.log(sub.getInfo()));
  })
  .catch(err => {
    console.error("Error adding subscribers:", err.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });


const john = new Subscriber({ name: "John", email: "john@email.com", zipCode: 12345 });
john.findLocalSubscribers();

console.log(john.getInfo());