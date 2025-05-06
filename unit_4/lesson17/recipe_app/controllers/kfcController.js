// controllers/kfcController.js

"use strict";
const { findAllKfcItems } = require("../models/kfc");

exports.getAllKfcItems = (req, res) => {
  findAllKfcItems()
    .then(items => {
      res.render("kfc", { kfcItems: items });
    })
    .catch(err => {
      console.error("❌ Error fetching KFC items:", err);
      res.status(500).send("Internal Server Error");
    });
};
