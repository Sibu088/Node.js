// models/kfc.js

"use strict";
const mongoose = require("mongoose");

// Define the schema
const kfcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  spicy: {
    type: Boolean,
    default: false
  }
});

// Create the model
const KfcItem = mongoose.model("KfcItem", kfcSchema);

// Export helper functions
exports.createKfcItem = (data) => {
  return KfcItem.create(data);
};

exports.findAllKfcItems = () => {
  return KfcItem.find({});
};

exports.KfcItem = KfcItem; // In case you need direct access later
